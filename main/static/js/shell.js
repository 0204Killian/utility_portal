
// javascript for shell.html navbar


/** function to target and toggle the toggle button on the navbar. */ 
function navbarToggle() {
    const toggleButton = document.querySelector(".toggle-button");
    const navbarLinks = document.getElementsByClassName("navbar-links")[0];

    toggleButton.addEventListener("click", () => {
        navbarLinks.classList.toggle("active")
    });
}


function start() {
    navbarToggle();
}

window.addEventListener("load", navbarToggle)
