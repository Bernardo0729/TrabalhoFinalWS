const express = require('express');
const { getAssets, createAsset, updateAsset, deleteAsset } = require('../controllers/assetController');
const { getPriceFromTwelveData } = require('../services/twelveDataService');
const router = express.Router();

router.get('/', getAssets);
router.post('/', createAsset);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

router.get('/:ticker/price', async (req, res) => {
    try {
        const ticker = req.params.ticker; 
        const priceData = await getPriceFromTwelveData(ticker);
        res.status(200).json(priceData); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

module.exports = router;
