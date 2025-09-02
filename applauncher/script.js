const animateText = document.getElementsByClassName("animation");

const letters = "ABCDEFGHIJKLONOPQRSTUVWXYZ";

for (let i = 0; i < animateText.length; i++) {
    /**
     * @type {HTMLTextAreaElement}
     */
    const text = animateText[i];
    const oldText = text.innerText;
    let buzy = false;

    text.onpointerover = ev => {
        if (buzy) return;

        let iterations = 0;
        buzy = true
        const interval = setInterval(() => {
            ev.target.innerText = oldText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return oldText[index]
                    }
                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");

            if (iterations >= oldText.length) {
                buzy = false;
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30)

    }

    window.addEventListener('scroll', () => {
        let position = text.getBoundingClientRect();

        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            if (text.getAttribute("data-played")) return;
            if (buzy) return text.setAttribute("data-played", true);

            let iterations = 0;
            buzy = true
            text.setAttribute("data-played", true);
            const interval = setInterval(() => {
                text.innerText = oldText.split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return oldText[index]
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if (iterations >= oldText.length) {
                    buzy = false;
                    clearInterval(interval);
                }

                iterations += 1 / 2;
            }, 30)
        }
    });
}

function redirectToAppLauncherDownload() {
    window.location.href = "https://github.com/Tommy1250/AppLauncherUI/releases/latest";
}

function redirectToHome() {
    window.location.href = "/";
}