const User = require('../models/User.js');

const dataLogin = {
    login: async(req,res) =>{
        const {usuario, password} = req.body;

        try{
            if(!usuario || !password){
                return.res.status(400).json({message: "preencha os capos corretamente"});
            }
            const verifyExist = await User.findOne({
                where:{
                    usuario: usuario,
                }
            });
            console.log(verifyExist);

            const exist = !!verifyExist
        
            if(!exist){
                await User.Create({
                    usuario,
                    password
                });
                const getInfos = await User.findOne({
                    where:{
                        usuario: usuario,
                    }
                })
            }
        }
    }
}