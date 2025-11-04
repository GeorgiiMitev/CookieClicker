let counter = document.getElementById("cookie-counter");
let cookie = document.getElementById("cookie");
let cookiesASecond = document.getElementById("cookies-a-second");
let errorContainer = document.getElementById("error-container");
let multiplierPlaceholder = document.getElementById("multiplier");
let popup = document.getElementById("pop-up");
let randomCookieContainer = document.getElementById("random-cookie-container");
let aside = document.getElementById("aside");

const thousand = 1000;
const million = 1000000;
// const billion = 1000000000;

let cookies = 0;
let multiplier = 1;
let perSecond = 0;

function showPopup() {
    popup.style = "display: flex;"
}
function hidePopup() {
    popup.style = "display: none;"
    aside.classList.remove('visible');
}
function showAsideMenu() {
    aside.classList.add('visible');
    aside.classList.remove('hidden');
}

function hideAsideMenu() {
    aside.classList.add('hidden');
    aside.classList.remove('visible');
    
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 568) {
        aside.classList.add('visible');
        aside.classList.remove('hidden');
    }
});
window.addEventListener('resize', () => {
    if (window.innerWidth <= 568) {
        aside.classList.add('hidden');
        aside.classList.remove('visible');
    }
});

function showErrorPopup(message) {
    let individualError = document.createElement("div");
    individualError.style = `background: red;color: white;
                            border-radius: 8px; padding: 0.5em 1em; display: block;
                            margin-bottom: 1em; z-index: 101;`;
    individualError.innerHTML = message;
    errorContainer.appendChild(individualError);

    setTimeout(() => {
        individualError.style = `background: red;color: white;
                            border-radius: 8px; padding: 0.5em 1em; display: block;
                            margin-bottom: 1em; z-index: 101; animation: opacityFade 0.5s ease-in-out; animation-fill-mode: forwards;`
    }, 1500);

    setTimeout(() => {
        errorContainer.removeChild(individualError);
    }, 2000);
}
function generateFloatingCookie() {
    let randomCookie = document.createElement("img");

    randomCookie.style = `animation: floatingCookie 0.8s linear, opacityFade 0.8s linear; animation-fill-mode: forwards;
                                  width: 33px; height: 33px; position: absolute; z-index: 100;
                                  top: ${Math.random() * 239}px; left:${(Math.random() * 251)}px; filter: drop-shadow(1px 1px 6px black);
                                  transition: opacity 2s linear; transform: rotate(${Math.random() * 361}deg);`;

    
    randomCookie.src = "images/cookie.png";
    randomCookieContainer.appendChild(randomCookie);
    setTimeout(() => {
        randomCookieContainer.removeChild(randomCookie);
    }, 1000);
}

function onCookieClicked() {
    cookies += multiplier;
    if (cookies >= million) {
        counter.innerHTML = (cookies / million).toFixed(2) + "M";
    }
    else if (cookies > thousand) {
        counter.innerHTML = (cookies / thousand).toFixed(2) + "K";
    }
    else {
        counter.innerHTML = cookies.toFixed(0);
    }
    cookie.style = "animation: bounce 0.2s ease-in-out";

    setTimeout(() => {
        cookie.removeAttribute("style");
    }, 100);
    /* cookie.style = "animation: bounceback 0.3s ease;";*/

}


// set values each second and display information in logs
setInterval(() => {
    cookies += perSecond;
    if (cookies >= million) {
        counter.innerHTML = (cookies / million).toFixed(2) + "M";
    }
    else if (cookies >= thousand) {
        counter.innerHTML = (cookies / thousand).toFixed(2) + "K";
    }
    else {
        counter.innerHTML = cookies.toFixed(0);
    }
    cookiesASecond.innerHTML = perSecond.toFixed(2);
    console.log("Current cookies:", cookies.toFixed(2));
    console.log("Per second:", perSecond.toFixed(2));

    if (perSecond >= 1) {  
        if(!document.hidden)
            generateFloatingCookie();   
    }

}, 1000)



function multiplierButton() {
    if (cookies >= 1000) {
        cookies -= 1000;
        multiplier += 0.1;
        if (cookies >= million) {
            counter.innerHTML = (cookies / million).toFixed(2) + "M";
        }
        else if (cookies >= thousand) {
            counter.innerHTML = (cookies / thousand).toFixed(2) + "K";
        }
        else {
            counter.innerHTML = cookies.toFixed(0);
        }
        console.log("New multiplier:", multiplier.toFixed(2))
        multiplierPlaceholder.innerHTML = multiplier.toFixed(1) + "x" + " 🍪";
    }
    else {
        showErrorPopup(`Not enough 🍪. You need ${1000 - cookies.toFixed(0)} more!`);
        return
    }
}
multiplierPlaceholder.innerHTML = multiplier.toFixed(1) + "x" + " 🍪";

function addCookies(cookieValue) {
    switch (cookieValue) {
        case 1:
            if (cookies >= 100) {
                perSecond += 1;
                cookies -= 100;
            }
            else {
                showErrorPopup(`Not enough 🍪. You need ${100 - cookies.toFixed(0)} more!`);
                return
            }
            break;
        case 5:
            if (cookies >= 500) {
                perSecond += 5;
                cookies -= 500;
            }
            else {
                showErrorPopup(`Not enough 🍪. You need ${500 - cookies.toFixed(0)} more!`);
                return
            }

            break;
        case 10:
            if (cookies >= 1000) {
                perSecond += 10;
                cookies -= 1000;
            }
            else {
                showErrorPopup(`Not enough 🍪. You need ${1000 - cookies.toFixed(0)} more!`);
                return
            }

            break;
        case 20:
            if (cookies >= 2000) {
                perSecond += 20;
                cookies -= 2000;
            }
            else {
                showErrorPopup(`Not enough 🍪. You need ${2000 - cookies.toFixed(0)} more!`);
                return
            }

            break;
        case 50:
            if (cookies >= 5000) {
                perSecond += 50;
                cookies -= 5000;
            }
            else {
                showErrorPopup(`Not enough 🍪. You need ${5000 - cookies.toFixed(0)} more!`);
                return
            }

            break;
        case 100:
            if (cookies >= 10000) {
                perSecond += 100;
                cookies -= 10000;
            }
            else {
                showErrorPopup(`Not enough 🍪. You need ${10000 - cookies.toFixed(0)} more!`);
                return
            }
            break;
    }
}

function resetAllProgress() {
    cookies = 0;
    multiplier = 1;
    perSecond = 0;
}

