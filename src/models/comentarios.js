const { DataTypes } = require('sequelize');
const sequelize  = require('./db.js'); // Certifique-se de que o caminho está correto

const Comentarios = sequelize.define('Comentarios', {
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
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,  // Usando o tipo DATE do Sequelize
        defaultValue: DataTypes.NOW,  // O Sequelize pode usar DataTypes.NOW para definir o timestamp atual
        allowNull: false,
    }
}, {
    tableName: 'Comentarios',
    timestamps: false,  // Desativa os timestamps automáticos (createdAt, updatedAt)
});

Comentarios.associate = function (models) {
    // Relacionamento com a tabela Galeria
    Comentarios.belongsTo(models.Galeria, {
        foreignKey: 'idImagem',
        onDelete: 'CASCADE'
    });
    // Relacionamento com a tabela Usuarios
    Comentarios.belongsTo(models.Usuarios, {
        foreignKey: 'idUsuario',
        onDelete: 'CASCADE'
    });
};

Comentarios.sync({ force: false })
    .then(() => console.log('Tabela Comentarios criada ou já existente'))
    .catch((error) => console.error('Erro ao criar a tabela:', error));


module.exports = Comentarios;
