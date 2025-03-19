const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())
app.use(express.static('public'));

const port = 8080;

mongoose.connect('mongodb://localhost:27017/MyDataBase')
.then(() => {console.log("Connecté à la database")})
.catch((err) => {console.log("Erreur de connection à la database", err)});

const clientSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    age: Number
});

const Client = mongoose.model('Clients', clientSchema, 'Clients');

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});