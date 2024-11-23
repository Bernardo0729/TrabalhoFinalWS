const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();


const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/assets', assetRoutes);
app.use('/transactions', transactionRoutes);

const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Funcionado na ${PORT}`);
    try {
        await sequelize.sync();
        console.log('Banco de dados sqlLite sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados sqlLite:', error);
    }
});
