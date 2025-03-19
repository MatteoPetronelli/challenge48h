window.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('user');
    const loggedInDiv = document.querySelector('.loggedIn');

    if (userData && loggedInDiv) {
        const user = JSON.parse(userData);
        loggedInDiv.textContent = `Bienvenue, ${user.registerPrenom} ${user.registerName} !`;
    }
});
