function setCSSProperty(name, value, unit = "") {
    document.documentElement.style.setProperty(name, String(value) + unit)
}

function handleTime(overrideHour = null) {
    function getDayPercent(hour) {
        // Diese Werte habe ich mit einem Gleichungssystem geholt:
        // eine Parabel, die bei 0 und 24 0 ist, aber bei 12 ist sie 100
        return -(25/36)*(hour**2) + ((50/3) * hour)
    }
    const timeOfDay = new Date().getTime() % (1000 * 60 * 60 * 24)
    let hour = timeOfDay / 1000 / 60 / 60
    if (overrideHour !== null) {
        hour = overrideHour
    }

    const dayPercent = getDayPercent(hour)
    setCSSProperty("--dayBrightness", dayPercent, "%")

    function hideSun(hide) {
        const sun = document.getElementById("sun");
        const shine = document.getElementById("sunshine");

        if (hide) {
            sun.style.display = "none"
            shine.style.display = "none"
        }
        else {
            sun.style.display = "block"
            shine.style.display = "block"
        }
    }
    
    hideSun(dayPercent < 75)
}

document.onscroll = e => {
    setCSSProperty("--scrollPosition", window.scrollY, "px")
}

handleTime()
// Jede Stunde soll die Tageshelligkeit angepasst werden
const timeInterval = setInterval(() => {
    handleTime()
}, 1000 * 60 * 60)