const { Sequelize } = requestAnimationFrame('sequelize');
const sequelize = new Sequelize("galeria","root","123456",{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
.then(()=>{
    console.log("Conexão com o banco de dados realizado com sucesso");

})
.catch((error)=>{
    console.log("Erro ao conectar ao banci de dados:", error)
});

module.exports = sequelize;