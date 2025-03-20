const express = require('express');
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const app = express();

app.use(express.json())
app.use(express.static('frontend'));

const port = 8080;

mongoose.connect('mongodb://localhost:27017/app')
.then(() => {console.log("Connecté à la database")})
.catch((err) => {console.log("Erreur de connection à la database", err)});

const clientSchema = new mongoose.Schema({
    registerName: String,
    registerPrenom: String,
    registerEmail: String,
    registerAge: Number,
    registerPassword: String
});

const Client = mongoose.model('Client', clientSchema);

app.post('/client', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.get('/client', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/login', async (req, res) => {
    try {
        const { loginEmail, loginPassword } = req.body;

        const client = await Client.findOne({
            registerEmail: loginEmail,
            registerPassword: loginPassword
        });

        if (client) {
            res.status(200).json({
                registerName: client.registerName,
                registerPrenom: client.registerPrenom,
                registerEmail: client.registerEmail
            });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


function lirePlanning() {
    const workbook = xlsx.readFile('frontend/assets/xlsx/PlanningBDS.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
}

function excelDateToJSDate(serial) {
    const excelEpoch = new Date(1899, 11, 30); // Excel démarre le 30 décembre 1899
    const date = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0]; // Format AAAA-MM-JJ
}


function parserPlanning(planningBrut) {
    const moisColonnes = {
        "Septembre": { colDate: "Calendrier 2025", colJour: "__EMPTY", colEvent: "__EMPTY_1" },
        "Octobre": { colDate: "__EMPTY_3", colJour: "__EMPTY_4", colEvent: "__EMPTY_5" },
        "Novembre": { colDate: "__EMPTY_7", colJour: "__EMPTY_8", colEvent: "__EMPTY_9" },
        "Décembre": { colDate: "__EMPTY_11", colJour: "__EMPTY_12", colEvent: "__EMPTY_13" },
        "Janvier": { colDate: "__EMPTY_15", colJour: "__EMPTY_16", colEvent: "__EMPTY_17" },
        "Février": { colDate: "__EMPTY_19", colJour: "__EMPTY_20", colEvent: "__EMPTY_21" },
        "Mars": { colDate: "__EMPTY_23", colJour: "__EMPTY_24", colEvent: "__EMPTY_25" },
        "Avril": { colDate: "__EMPTY_28", colJour: "__EMPTY_29", colEvent: "__EMPTY_30" },
        "Mai": { colDate: "__EMPTY_32", colJour: "__EMPTY_33", colEvent: "__EMPTY_34" },
        "Juin": { colDate: "__EMPTY_36", colJour: "__EMPTY_37", colEvent: "__EMPTY_38" }
    };

    const planningFinal = [];

    planningBrut.forEach(row => {
        Object.keys(moisColonnes).forEach(mois => {
            const dateExcel = row[moisColonnes[mois].colDate];
            const jourSemaine = row[moisColonnes[mois].colJour];
            const event = row[moisColonnes[mois].colEvent];

            if (dateExcel && jourSemaine) {
                const dateLisible = excelDateToJSDate(dateExcel);

                planningFinal.push({
                    mois,
                    date: dateLisible,
                    jour: jourSemaine,
                    evenement: event || ""
                });
            }
        });
    });

    return planningFinal;
}


app.get('/planning', (req, res) => {
    try {
        const data = lirePlanning();
        const planning = parserPlanning(data);
        res.status(200).json(planning);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la lecture du planning", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

