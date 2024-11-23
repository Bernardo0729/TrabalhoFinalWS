const axios = require('axios');

const getPriceFromTwelveData = async (ticker) => {
    try {
        const response = await axios.get('https://api.twelvedata.com/price', {
            params: {
                symbol: ticker,
                apikey: process.env.TWELVE_DATA_API_KEY
            }
        });

        if (!response.data.price) {
            throw new Error('Ativo não encontrado ou preço indisponível.');
        }

        return {
            symbol: ticker,
            price: parseFloat(response.data.price),
            currency: 'USD'
        };
    } catch (error) {
        console.error('Erro na API:', error.response?.data || error.message);
        throw new Error(`Erro ao obter preço do ativo: ${error.response?.data?.message || error.message}`);
    }
};

module.exports = { getPriceFromTwelveData };
