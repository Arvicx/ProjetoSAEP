const User = require('../models/User.js');
const Galeria = require('../models/galeria.js');
const Comentarios = require('../models/Comentarios.js');
const Likes = require('../models/likes.js');
const router = require('../routes/socialMedia.js');

const dataPosts = {

    loadImages: async (req, res) => {

        try {

            const imagens = await Galeria.findAll()
            res.status(200).json({ message: "Enviado com sucesso", dados: imagens });

        } catch (error) {
            res.status(400).json({ message: "Houve um erro " + error })
        }

    },

    getImage: async (req, res) => {

        const { idImage } = req.body;

        try {

            const searchImage = await Galeria.findByPk(idImage);

            if (!searchImage) {
                return res.status(404).json({ message: "Imagem não encontrada", error: true })
            }


            res.status(200).json({ message: "Imagem enviada", dados: searchImage, error: false })
            return

        } catch (error) {
            console.log("Houve um erro no servidor: " + error)
            res.status(500).json({ message: "Houve um erro, tente novamente mais tarde" })
            return
        }

    },

    commentPosts: async (req, res) => {
        const { comentario, idImagem, idUsuario } = req.body;

        if (!idUsuario) {
            return res.status(401).json({ message: "Faça Login ou Crie uma conta para prosseguir" });
        }

        // Verifica se o comentário e o idImagem foram enviados
        if (!comentario || comentario.length <= 2) {
            return res.status(400).json({ message: "Adicione um comentário com mais de 2 caracteres" });
        }

        try {
            // Verificar se a imagem existe na galeria
            const imagem = await Galeria.findByPk(idImagem);

            if (!imagem) {
                return res.status(404).json({ message: "Imagem não encontrada" });
            }

            // Verificar se o usuário existe
            const usuario = await User.findByPk(idUsuario);

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado, crie uma conta para prosseguir.", erro: false, logado: false, });
            }

            // Criar o novo comentário na tabela Comentarios
            const novoComentario = await Comentarios.create({
                comentario,
                idImagem,
                idUsuario, 
            });

            const totalComentarios = await Comentarios.count({
                where: {
                    idImagem: idImagem,
                }
            });

            // Atualiza o campo de comentários na tabela Galeria com o total de comentários
            await Galeria.update(
                { comentarios: totalComentarios },
                { where: { id: idImagem } }
            );

            // Retorna uma resposta com o comentário adicionado
            return res.status(201).json({
                message: "Comentário adicionado com sucesso!",
                comentario: novoComentario,
                isCommented: true,
                //allComments: sendAllComments,
            });

        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            return res.status(500).json({ message: "Erro ao adicionar comentário" });
        }
    },

    allComments: async (req, res) => {

        try {

            const sendAllComments = await Comentarios.findAll();

            res.status(200).json({ message: "All comments was sended", allComments: sendAllComments, })

        } catch (error) {

        }

    },

    likePosts: async (req, res) => {

        const { idImagem, idUsuario } = req.body;  // Recebe o ID da imagem e o ID do usuário

        if (!idImagem) {
            return res.status(400).json({ message: "Imagem não especificada" });
        }

        if (!idUsuario) {
            return res.status(401).json({ message: "Realize login para curtir a foto" });
        }

        try {
            // Buscar a imagem pelo ID
            const imagem = await Galeria.findByPk(idImagem);

            if (!imagem) {
                return res.status(404).json({ message: "Imagem não encontrada" });
            }

            // Verificar se o like já existe para o usuário e a imagem
            const likeExistente = await Likes.findOne({
                where: { idImagem, idUsuario }
            });

            if (likeExistente) {
                // Se o like já existe, removemos o like
                await likeExistente.destroy();  // Remove o like da tabela Likes

                // Decrementa o número de likes na tabela Galeria
                imagem.likes -= 1;
                await imagem.save();

                return res.status(200).json({
                    message: "Like removido com sucesso",
                    likeCount: imagem.likes,  // Retorna o número atualizado de likes
                    isLiked: false,
                });
            } else {
                // Se o like não existe, criamos um novo like
                await Likes.create({
                    idImagem,
                    idUsuario
                });

                // Incrementa o número de likes na tabela Galeria
                imagem.likes += 1;
                await imagem.save();

                return res.status(200).json({
                    message: "Like adicionado com sucesso",
                    likeCount: imagem.likes,  // Retorna o número atualizado de likes
                    isLiked: true,
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao processar a solicitação" });
        }
    }

}

module.exports = dataPosts;