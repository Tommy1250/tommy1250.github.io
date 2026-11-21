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
                    if(index < iterations){
                        return oldText[index]
                    }
                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");

            if(iterations >= oldText.length) {
                buzy = false;
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30)
        
    }

    window.addEventListener('scroll', () => {
        let position = text.getBoundingClientRect();
    
        if(position.top >= 0 && position.bottom <= window.innerHeight) {
            if (text.getAttribute("data-played")) return;
            if (buzy) return text.setAttribute("data-played", true);

            let iterations = 0;
            buzy = true
            text.setAttribute("data-played", true);
            const interval = setInterval(() => {
                text.innerText = oldText.split("")
                    .map((letter, index) => {
                        if(index < iterations){
                            return oldText[index]
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if(iterations >= oldText.length) {
                    buzy = false;
                    clearInterval(interval);
                }

                iterations += 1 / 2;
            }, 30)
        }
    });
}

function redirectToWatchTogether(){
    window.location.href = "https://wt.zerog.qd.je/";
}

function redirectToReplayDownload(){
    window.location.href = "https://github.com/Tommy1250/Replay/releases/latest";
}

function redirectToAppLauncherDownload() {
    window.location.href = "https://github.com/Tommy1250/RocketLauncher/releases/latest";
}

function redirectToAppLauncherPage() {
    window.location.href = "/applauncher";
}

function redirectToReplayPage() {
    window.location.href = "/replay";
}

function redirectToTikTakToe(){
    window.location.href = "https://xo.zerog.qd.je/";
}

function redirectToVoice() {
    window.location.href = "https://voice.zerog.qd.je/";
}

const overlay = document.getElementById("overlay");
const appImg = document.getElementById("appimg");
const backGround = document.getElementById("bg");
// const applink = document.getElementById("applink");
// const imglink = document.getElementById("imglink");

function popupPhoto(pName){
    appImg.src = `/images/${pName}`;
    // imglink.href = `/images/${pName}`;
    // applink.href = link;

    overlay.classList.remove("hidden");
    setTimeout(function () {
        overlay.classList.add('visible');
    }, 60);
}

window.addEventListener('scroll', function () {
    overlay.style.top = window.innerHeight / 2 + window.scrollY + 'px';
});

backGround.onclick = () => {
    overlay.classList.remove("visible");
    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 60)
}