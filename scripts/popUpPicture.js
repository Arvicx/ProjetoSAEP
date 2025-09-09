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