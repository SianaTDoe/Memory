const title = document.querySelector("#title"); //rechercher id title
const container = document.querySelector('#jeu');

const linkImg = ['mem1.png', 'mem2.png', 'mem3.png', 'mem4.png', 'mem5.png', 'mem6.png'];
const allImg = [...linkImg, ...linkImg];

while (allImg.length != 0) {
    const index = Math.random() * allImg.length << 0;
    const chemin = allImg.splice(index, 1)[0];
    const image = `<div class="imgContainer"><img class="imgBack" src="img_mem/memback.png"><img name="${chemin}" class="imgFront" src="img_mem/${chemin}"></div>`;
    container.insertAdjacentHTML('beforeend', image);
}

const cartes = document.querySelectorAll('.imgContainer');
const backs = document.querySelectorAll('.imgBack');

let isSame = null;
let block = false;

backs.forEach(back => {
    back.addEventListener('click', () => {


        if (!block) {
            back.style.display = 'none';
            back.nextElementSibling.style.display = 'block';

            // alert(isSame);

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
        // alert(isSame);

    })
})

function gagne(back) {
    block = true;
    setTimeout(() => {
        const elements = document.querySelectorAll(`img[name='${isSame}']`);
        elements.forEach(element => element.parentElement.style.visibility = 'hidden')

        back.parentElement.style.visibility = 'hidden';

        isSame = null;
        block = false;
    }, 1500)
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
    }, 1500)
}

// link.addEventListener("click", () => {
//     let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16); //<<0 = math.floor
//     title.style.color = color; // changer style
// });

console.log(linkImg);