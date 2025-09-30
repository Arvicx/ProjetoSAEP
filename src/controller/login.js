const User = require('../models/User.js');

const dataLogin = {

    login: async (req, res) => {

        const { usuario, password } = req.body;

        try {
            // Criando o novo usuário

            if (!usuario || !password) {
                return res.status(400).json({ message: "Preencha os campos corretamente" });
            }

            const verifyExist = await User.findOne({
                where: {
                    usuario: usuario,
                }
            })

            console.log(verifyExist)

            const exist = !!verifyExist

            if (!exist) {

                await User.create({
                    usuario,
                    password
                });

                const getInfos = await User.findOne({
                    where: {
                        usuario: usuario,
                    }
                })

                res.status(200).json({ message: "Usuario cadastrado com sucesso", erro: false, usuario: usuario.usuario, logado:true, userId: getInfos.id})

                return
            }

            if (verifyExist.password !== password) {
                return res.status(401).json({ messsage: "Usuário ou senha incorretos" });
            }

            // Caso o usuário e a senha estejam corretos
            return res.status(200).json({
                message: "Login autorizado",
                erro: false,
                usuario: usuario.usuario,
                userId: verifyExist.id,
                logado: true,
            });


        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return res.status(500).json({
                erro: true,
                message: "Erro interno no servidor",
                logado: false,
            });
        }

    }

}

module.exports = dataLogin;