const toggleButton = document.getElementsByClassName('toggle-buttonn')[0];
const navbarLink = document.getElementsByClassName('navbar-linkss')[0];


toggleButton.addEventListener('click', ()=> {
    navbarLink.classList.toggle('active')
})