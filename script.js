document.onscroll = e => {
    document.documentElement.style.setProperty('--scrollPosition', window.scrollY + "px");
}