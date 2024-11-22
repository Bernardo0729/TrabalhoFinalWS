const sequelize = require('./config/database');
const { User, Asset, Transaction, Dividend } = require('./models');

(async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();
