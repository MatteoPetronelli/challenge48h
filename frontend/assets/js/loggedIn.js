window.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('user');
    const loggedInDiv = document.querySelector('.loggedIn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userData && loggedInDiv) {
        const user = JSON.parse(userData);
        loggedInDiv.textContent = `Bienvenue, ${user.registerPrenom} ${user.registerName} !`;

        logoutBtn.style.display = 'inline-block';

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            loggedInDiv.textContent = 'Vous êtes déconnecté.';
            logoutBtn.style.display = 'none';

            // Optionnel : redirige vers login/register
            window.location.href = 'login_register.html';
        });
    }
});
