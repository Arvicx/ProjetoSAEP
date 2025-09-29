const {DataType} = require('sequelize');
const sequelize = require('./db.js');

const Comentarios = sequelize.define('Comentarios',{
    id: {
        type: sequelize.INTEGER,
        primarykey: true,
        autoIcrement: true,
        allowNull: false
     },
     idImagem:{
        type:DataTypes.INTEGER,
        allowNull: false
     },
     idUsuario:{
        type:DataTypes.INTEGER,
        allowNull: false
     },
     comentario:{
        type:DataTypes.TEXT,
        allowNull: false
     },
     createdAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.now,
        allowNull: false
     }
    },{
    tableName:'Comentarios',
    timestamps:false,
    });

    Comentarios.associate = function(models){
        Comentarios.belongsTo(models.Galeria,{
        foreignKey: 'idImagem',
        onDelete: 'CARCADE'
        });

        Comentarios.belongsTo(models.Usuarios,{
        foreignKey: 'idUsuario',
        onDelete: 'CASCADE'
        });
    };
    
//Sicronizar o modelo(cria a tabela no banco de dados)

Comentarios.sync({force: false})
.then(() => console.log("Tabela users criada ou ja existe"))
.catch((error) => console.error('Erro ao cria a tabela:', error));

module.exports = Comentarios;