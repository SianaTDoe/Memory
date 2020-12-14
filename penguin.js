const title = document.querySelector("#title");
const container = document.querySelector('#jeu');
let result = document.querySelector('#result');

const linkImg = ['penguin1.png', 'penguin2.png', 'penguin3.png', 'penguin4.png', 'penguin5.png', 'penguin6.png'];
const allImg = [...linkImg, ...linkImg];

while (allImg.length != 0) {
    const index = Math.random() * allImg.length << 0;
    const chemin = allImg.splice(index, 1)[0];
    const image = `<fieldset class="field1">
<fieldset class="field2"><div class="imgContainer"><img class="imgBack" src="Penguin_mem/imgbackpengu.png"><img name="${chemin}" class="imgFront" src="Penguin_mem/${chemin}"></div></fieldset></fieldset>`;
    container.insertAdjacentHTML('beforeend', image);
}

const cartes = document.querySelectorAll('.imgContainer');
const backs = document.querySelectorAll('.imgBack');

let isSame = null;
let block = false;
let score = 0;

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
    if (score == linkImg.length) {
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

