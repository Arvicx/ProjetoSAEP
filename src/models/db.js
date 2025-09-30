const { Sequelize } = require('sequelize');

// Criando a instância do Sequelize
const sequelize = new Sequelize("galeria", "root", "123456", {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Mostra os logs de conexão
});

// Testando a conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

module.exports = sequelize ;
