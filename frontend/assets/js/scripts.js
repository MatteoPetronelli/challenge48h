document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".btn-secondary");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            alert("Filtrage en cours : " + this.innerText);
        });
    });
});
