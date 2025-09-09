const items = document.querySelectorAll(".item img");
const boxComment = document.getElementById("boxComment");
const closeComments = document.getElementById("closeComments");

items.forEach((img, index) => {
    img.addEventListener("click", () => {
        boxComment.style.display = "flex";
        localStorage.setItem("idImage", index + 1);
    });
});

// Fechar Pop-Up de Comentários

closeComments.addEventListener("click", () => {
    boxComment.style.display = "none";
});

// Pegar botão de like e contador 

const likeBtn = document.querySelector(".boxComment .like");
const likeCount = document.querySelector(".boxComment .like span");

let curtido = false;

likeBtn.addEventListener("click", ()=>{
    let valor = parseInt(likeCount.textContent);

    if(!curtido){
        likeCount.textContent = valor + 1;
        likeBtn.src = "./Icones/coraçãoVermelho.svg";
        curtido = true;
    }else{
        likeCount.textContent = valor - 1;
        likeBtn.src = "./Icones/coração.svg";
        curtido = false;
    }

});