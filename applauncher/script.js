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


async function loadReleaseInfo() {
    const container = document.createElement('section');
    container.id = 'release-info';
    container.className = 'release-card';
    container.innerHTML = `<h2>Latest Release</h2><p class="muted">Loading...</p>`;
    const patchNotesHolder = document.getElementById("patchNotes");
    patchNotesHolder.appendChild(container);

    try {
        const res = await fetch('https://api.github.com/repos/Tommy1250/AppLauncherUI/releases/latest');
        if (!res.ok) throw new Error('GitHub API error: ' + res.status);
        const data = await res.json();

        const notes = data.body ? data.body : 'No patch notes available.';

        const asset = data.assets && data.assets.find(a => a.name && a.name.toLowerCase().endsWith('.exe'));
        const downloadUrl = asset ? asset.browser_download_url : (data.html_url || 'https://github.com/Tommy1250/AppLauncherUI/releases');

        let checksum = 'Checksum not provided.';
        if (data.body) {
            checksum = asset.digest
        }
        
        const dlBtn = document.getElementById('download-btn');
        if (dlBtn && downloadUrl) {
            dlBtn.href = downloadUrl;
        }

        const versionInfoTemp = document.getElementById("versionInfo");
        const versionInfoHolder = versionInfoTemp.content.cloneNode(true);

        const tagName = versionInfoHolder.getElementById("tagname");
        tagName.innerText = `${data.tag_name || 'Unknown'}`;
        
        const patchNotesHolder2 = versionInfoHolder.getElementById("patchNotes");
        patchNotesHolder2.innerText = notes;

        const checksumHolder = versionInfoHolder.getElementById("checksum");
        checksumHolder.innerText = checksum;

        const downloadLinkHolder = versionInfoHolder.getElementById("downloadLink");
        downloadLinkHolder.href = downloadUrl;

        container.innerHTML = "";
        container.appendChild(versionInfoHolder);
    } catch (err) {
        console.error(err);
        container.innerHTML = `<h2>Latest Release</h2><p class="muted">Failed to load release info.</p>`;
    }
}
loadReleaseInfo();

const overlay = document.getElementById("overlay");
const appImg = document.getElementById("appimg");
const backGround = document.getElementById("bg");

function popupPhoto(pName){
    appImg.src = `/images/algallery/${pName}`;
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