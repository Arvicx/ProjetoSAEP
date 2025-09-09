const dados =  [
    {src: "./Imagens/Everest.jpg", likes: 12, comentarios: 7},
    {src: "./Imagens/GrandCanyon.jpg", likes: 7, comentarios: 3},
    {src: "./Imagens/AlpesSuiços.jpg", likes: 4, comentarios: 1},
    {src: "./Imagens/Huandoy.jpg", likes:21, comentarios: 8},
    {src: "./Imagens/MonteBranco.jpg", likes: 5, comentarios: 2},
    {src: "./Imagens/MonteElbrus.jpg", likes: 4, comentarios: 3},
    {src: "./Imagens/MonteFuji.jpg", likes: 9, comentarios: 5},
    {src: "./Imagens/PicoPikes.jpg", likes: 6, comentarios: 2},
];

const items = document.querySelector(".item");
items.forEach((items, index) => {
    const img = items.querySelectorAll("img");
    const spans = items.querySelectorAll(".interac span");

    img.src = dados[index].src;
    spans[0].textContent = dados[index].likes;
    spans[1].textContent = dados[index].comentarios;
});