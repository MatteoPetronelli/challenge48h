const form = document.getElementById("clientForm")
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = {
        nom: form.nom.value,
        prenom: form.prenom.value,
        email: form.email.value,
        age: form.age.value
    }

    try {
        const response = await fetch('http://localhost:8080/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok)
        {
            alert('Client ajouté avec succès !');
            form.reset();
        } else {
            alert("Erreur lors de l'ajout du client");
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de contacter le serveur.');
    }
})
