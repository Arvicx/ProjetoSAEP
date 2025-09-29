const sequelize = require('./models/db.js');
const Galeria = require('./models/galeria.js');

(async () =>{
    try{
        await sequelize.sync({force: true});

        await Galeria.bulkCreate([
            {titulo: 'EVEREST', link: 'https://i.ibb.co/GQ370K8G/Everest.jpg'},
            {titulo: 'MONTE FUJI', link: 'https://i.ibb.co/FbVSPRSC/Monte-Fuji.jpg'},
            {titulo: 'ALPES SUÍÇOS', link: 'https://i.ibb.co/79x7tRc/Alpes-Sui-os.jpg'},
            {titulo: 'GRAND CANYON', link: 'https://i.ibb.co/7tXXqrtH/Grand-Canyon.jpg'},
            {titulo: 'MONTE BRANCO', link: 'https://i.ibb.co/3YGYwyGt/Monte-Branco.jpg'},
            {titulo: 'MONTE ELBRUS', link: 'https://i.ibb.co/PvD4sYDS/Monte-Elbrus.jpg'},
            {titulo: 'PICO PIKES', link: 'https://i.ibb.co/1c9hLBg/Pico-Pikes.jpg'},
            {titulo: 'HUANDOY', link: 'https://i.ibb.co/7J5DFXBR/Huandoy.jpg'},
        ],
    {ignoreDuplicates:true}
    );
    console.log('Dados inseridos com sucesso!');
    }catch(error){
        console.error('Erro ao inserir os dados:'), error;
    }finally{
    process.exit();
    }
});