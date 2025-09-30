const express = require('express');
const router = express.Router();
const dataLogin = require('../controller/login.js');
const postsGaleria = require('../controller/postsGaleria.js');

router.get("/",(req, res) => {
    res.send("Hello World");
});

//Rota para carregar imagens
router.get('/imagens', postsGaleria.loadImages);

//Rota para pegar a imagem específica do ID
router.post('/getImage', postsGaleria.getImage);

//Rota para comentar nos posts
router.post('/comentar', postsGaleria.commentPosts);

//Rota para mostrar todos os comentários
router.get('/comentarios',postsGaleria.allComments);

//Rota para dar like nos posts
router.post('/likes', postsGaleria.likePosts);

//Rota para logar na rede social
router.post('/login', dataLogin.login);

module.exports = router;