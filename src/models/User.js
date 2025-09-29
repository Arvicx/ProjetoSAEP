const {DataTypes}= require('sequelize');
const sequelize = require('./db.js'); // importando a instacia do sequelize


const Likes = sequelize.define('Likes',{
 id: {
    type: sequelize.INTEGER,
    primarykey: true,
    autoIcrement: true,
    allowNull: false,
 },
 usuario:{
    type: sequelize.STRING,
    allowNull: false
 },
 password:{
    type: sequelize.STRING,
    allowNull: false
 },
    
});

//Sicronizar o modelo(cria a tabela no banco de dados)

User.sync({force: false})
.then(() => console.log("Tabela users criada ou ja existe"))
.catch((error) => console.error('Erro ao cria a tabela:', error));

module.exports = User;