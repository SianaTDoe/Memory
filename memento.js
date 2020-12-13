const images = document.querySelectorAll("img");  //tableau des images
const title = document.querySelector("#title");  //rechercher id title 
// const tabColor = ["#ED2CD8", "#ED2C58", "#9B3AE7", "#2C97ED"]




//TITRE COULEUR RANDOM AU CLIC IMG 

images.forEach(image => {  
    image.addEventListener("click", () => {
    //   alert('hei')
    let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);   //<<0 = math.floor
    title.style.color=color;            // changer style 

    });
});





//MEMORY




