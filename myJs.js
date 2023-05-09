var nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if (this.window.pageYOffset > 100) {
        nav.classList.add('shadow');
        nav.style.backgroundColor = "#BFCCB5";
    } else {
        nav.classList.remove('shadow');
        nav.style.backgroundColor = "";
    }
});