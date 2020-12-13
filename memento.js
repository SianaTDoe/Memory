// const images = document.querySelectorAll("img");  //tableau des images
const title = document.querySelector("#title");
const container = document.querySelector('#jeu');
const linkImg = ['mem1.png', 'mem2.png', 'mem3.png', 'mem4.png', 'mem5.png', 'mem6.png'];
const allImg = [...linkImg, ...linkImg];



while (allImg.length != 0) {
    const index = Math.random() * allImg.length << 0;
    const image = `<div class="imgContainer"><img class="imgBack" src="img_mem/memback.png"><img class="imgFront" src="img_mem/${allImg.splice(index, 1)[0]}"></div>`;
    container.insertAdjacentHTML("beforeend", image);
}


const backs = document.querySelectorAll(".imgBack");

let isSame = null;

backs.forEach(back => {
    back.addEventListener('click', () => {

        if (isSame == null){
            isSame = back.nextElementSibling; 
        } else if (back.nextElementSibling == isSame) {
            back.parentElement.style.visibily = 'hidden';
            isSame.parentElement.style.visibily = 'hidden';
            isSame = null;
        } else {
            back.style.display = 'block';
            isSame.previousSibling.style.display = 'block';
            isSame = null;
            
        }

        back.style.display = 'none';
        back.nextElementSibling.style.display = 'block';
    });
});





// allImg.forEach(link => {  
//      const image = `<img src="img_mem/${link}">` ;
//      container.insertAdjacentHTML("beforeend", image);
// });



    // link.addEventListener("click", () => {

    // let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);  math.floor
    // title.style.color=color;            
    // });











