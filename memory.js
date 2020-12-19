import { linkImg } from "./library.js";

const linkCSS = document.getElementById('css');
const title = document.querySelector("#title");
const container = document.querySelector('#jeu');
const result = document.querySelector('#result');

const themeButtons = document.querySelectorAll(".theme");
let theme = 1;
let css = "saturn";

let score = 0;

game();


themeButtons.forEach(themeButton =>
    themeButton.addEventListener("click", () => {
      theme = Array.prototype.indexOf.call(themeButtons, themeButton);
      css = themeButton.id;
      game();
    })
);

function resetGame () {
    score = 0;
    while (container.lastElementChild) container.removeChild(container.lastElementChild);
}

function game() {
    resetGame();

    linkCSS.setAttribute('href', css + '.css');

    const allImg = [...linkImg[theme].front, ...linkImg[theme].front];
    const imgBack = linkImg[theme].back;

    title.innerText = linkImg[theme].title;

    while (allImg.length != 0) {
        const index = Math.random() * allImg.length << 0;
        const chemin = allImg.splice(index, 1)[0];
        const image = `<fieldset class="field1">
<fieldset class="field2"><div class="imgContainer"><img class="imgBack" src="${imgBack}"><img name="${chemin}" class="imgFront" src="${chemin}"></div></fieldset></fieldset>`;
        container.insertAdjacentHTML('beforeend', image);
    }

    const cartes = document.querySelectorAll('.imgContainer');
    const backs = document.querySelectorAll('.imgBack');

    let isSame = null;
    let block = false;

    backs.forEach(back => {
        back.addEventListener('click', () => {

            let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16); //<<0 = math.floor
            title.style.color = color;

            if (!block) {
                back.style.display = 'none';
                back.nextElementSibling.style.display = 'block';



                if (isSame == null) {
                    console.log('new compare');
                    isSame = back.nextElementSibling.name;
                } else if (back.nextElementSibling.name == isSame) {
                    console.log('trouvé');
                    gagne(back);
                } else {
                    console.log('perdu');
                    perdu(back);
                }
            }


        })
    })

    function gagne(back) {
        score++;
        block = true;
        if (score == linkImg[theme].front.length) {
            result.textContent = "Gagné !";
            const elements = document.querySelectorAll('.imgFront');
            elements.forEach(element => {
                element.parentElement.style.visibility = 'visible';
                element.style.display = 'block';
            })
        } else {
            setTimeout(() => {
                const elements = document.querySelectorAll(`img[name='${isSame}']`);
                elements.forEach(element => element.parentElement.style.visibility = 'hidden')

                back.parentElement.style.visibility = 'hidden';

                isSame = null;
                block = false;
                result.textContent = "Génial !";
            }, 1000)
        }
    }

    function perdu(back) {
        block = true;
        setTimeout(() => {
            const elements = document.querySelectorAll(`img[name='${isSame}']`);
            elements.forEach(element => {
                element.previousSibling.style.display = 'block';
                element.style.display = 'none';
            })

            back.style.display = 'block';
            back.nextElementSibling.style.display = 'none';

            isSame = null;
            block = false;
            result.textContent = "Essaye encore !";
        }, 1000)
    }
}
