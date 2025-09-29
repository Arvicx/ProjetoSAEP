const sequelize = require('./models/db.js');
const Galeria = require('./models/galeria.js');

(async () =>{
    try{
        await sequelize.sync({ force: true});

        await Galeria.bulkCreate({
            {titulo: 'EVEREST', link: 'https://i.ibb.co/GQ370K8G/Everest.jpg'},
            {titulo: 'MONTE FUJI', link: ''}
        })
    }
    catch{

    }
})