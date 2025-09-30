const { DataTypes } = require('sequelize');
const sequelize = require('./db.js'); // Certifique-se de que o caminho está correto

// Definindo o modelo de Galeria
const Galeria = sequelize.define('galeria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Valor inicial padrão de likes é 0
    },
    comentarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Valor inicial padrão de likes é 0
    }
});

// Sincronizando a tabela no banco de dados com força falsa
Galeria.sync({ force: false })
    .then(() => console.log('Tabela Galeria sincronizada com sucesso'))
    .catch(err => console.log('Erro ao sincronizar a tabela Galeria: ', err));

module.exports = Galeria;