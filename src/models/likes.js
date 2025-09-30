const { DataTypes } = require('sequelize');
const sequelize = require('./db.js'); // Certificando-se de que o caminho do arquivo de conexão está correto

// Definindo o modelo Likes
const Likes = sequelize.define('Likes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    idImagem: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'Likes', // Define o nome da tabela como 'Likes'
    timestamps: true, // Garante que o Sequelize crie automaticamente 'createdAt' e 'updatedAt'
});

// Definindo os relacionamentos
Likes.associate = function (models) {
    // Relacionamento com a tabela Galeria
    Likes.belongsTo(models.galeria, {
        foreignKey: 'idImagem',
        onDelete: 'CASCADE',  // Quando uma imagem for deletada, seus likes também serão removidos
    });

    // Relacionamento com a tabela Users
    Likes.belongsTo(models.users, {
        foreignKey: 'idUsuario',
        onDelete: 'CASCADE',  // Quando um usuário for deletado, seus likes serão removidos
    });
};

Likes.sync({ force: true })
    .then(() => console.log('Tabela Likes criada ou já existente'))
    .catch((error) => console.error('Erro ao criar a tabela:', error));


module.exports = Likes;
