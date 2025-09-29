const {DataTypes} = require('sequelize');
const sequelize = require('./db.js');

const Galeria = sequelize.define('galeria',{
    id: {
       type: sequelize.INTEGER,
       primarykey: true,
       autoIcrement: true,
       allowNull: false,
    },

    titulo:{
        type: sequelize.STRING,
        allowNull: false
     },
     link:{
        type: sequelize.STRING,
        allowNull: false
     },
     likes:{
        type: sequelize.STRING,
        allowNull: false,
        defaultValue:0
     },
     comentarios:{
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
     }
    });

    // Sicronizando o modelo (cria a tabela no banco de dados)