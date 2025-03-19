const form = document.getElementById("clientForm")
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = {
        registerName: form.registerName.value,
        registerPrenom: form.registerPrenom.value,
        registerEmail: form.registerEmail.value,
        registerAge: form.registerAge.value,
        registerPassword: form.registerPassword.value
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

const loginForm = document.getElementById("loginForm")
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = {
        loginEmail: loginForm.loginEmail.value,
        loginPassword: loginForm.loginPassword.value
    }

    try {
        const loginResponse = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(loginResponse.ok)
        {
            const result = await loginResponse.json();
            localStorage.setItem('user', JSON.stringify(result));
            window.location.href = 'index.html';
        } else {
            alert('Email ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de contacter le serveur.');
    }
})