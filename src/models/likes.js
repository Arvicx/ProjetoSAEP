const Sequelize = require('sequelize');
const Comentarios = require('./comentarios.js');
const sequelize = require('./db.js'); // importando a instacia do sequelize

// definindo o modelo User

const Likes = sequelize.define('Likes',{
 id: {
    type: sequelize.INTEGER,
    primarykey: true,
    autoIcrement: true,
    allowNull: false,
 },
 idImagem:{
    type:DataTypes.INTEGER,
    allowNull: false
 },
 idUsuario:{
    type:DataTypes.INTEGER,
    allowNull: false
 }
},{
tableName:'Likes',
timestamps:true,

});

Comentarios.associate = function(models){
    Comentarios.belongsTo(models.Galeria,{
    foreignKey: 'idImagem',
    onDelete: 'CARCADE'
    });

    Comentarios.belongsTo(models.Users,{
    foreignKey: 'idUsuario',
    onDelete: 'CASCADE'
    });
};

//Sicronizar o modelo(cria a tabela no banco de dados)

Likes.sync({force: false})
.then(() => console.log("Tabela users criada ou ja existe"))
.catch((error) => console.error('Erro ao cria a tabela:', error));

module.exports = Likes;
