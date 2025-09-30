// models/User.js
const Sequelize = require('sequelize');
const sequelize = require('./db.js'); // Importando a instância do Sequelize corretamente

// Definindo o modelo User
const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Sincronizando o modelo (cria a tabela no banco de dados)
User.sync({ force: false })
    .then(() => console.log('Tabela users criada ou já existente'))
    .catch((error) => console.error('Erro ao criar a tabela:', error));

module.exports = User;
