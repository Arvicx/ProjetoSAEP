const sequelize = require('./models/db.js'); // Ajuste o caminho para o arquivo de configuração
const Galeria = require('./models/galeria.js');

(async () => {
  try {
    await sequelize.sync({ force: true }); // Sincroniza os modelos com o banco de dados

    await Galeria.bulkCreate(
      [
        { titulo: 'EVEREST', link: 'https://i.ibb.co/F6K9tSm/Everest.jpg' },
        { titulo: 'MONTE FUJI', link: 'https://i.ibb.co/LNDhVdy/Monte-Fuji.jpg' },
        { titulo: 'ALPES SUIÇOS', link: 'https://i.ibb.co/JF1vWv0/Alpes-Sui-os.jpg' },
        { titulo: 'CANYON', link: 'https://i.ibb.co/4TWtRwn/Grand-Canyon.jpg' },
        { titulo: 'MONTE BRANCO', link: 'https://i.ibb.co/FWmdTB3/Monte-Branco.jpg' },
        { titulo: 'ELBRUS', link: 'https://i.ibb.co/MMV3rWW/Monte-Elbrus.jpg' },
        { titulo: 'PICO-PIKES', link: 'https://i.ibb.co/4p2Jr1V/Pico-Pikes.jpg' },
        { titulo: 'HUANDOY', link: 'https://i.ibb.co/M8MZ49N/Huandoy.jpg' }
      ],
      { ignoreDuplicates: true }
    );
    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    process.exit(); // Finaliza o script
  }
})();
