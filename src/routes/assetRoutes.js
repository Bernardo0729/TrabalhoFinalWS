const express = require('express');
const { getAssets, createAsset, updateAsset, deleteAsset } = require('../controllers/assetController');
const router = express.Router();

router.get('/', getAssets);
router.post('/', createAsset);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

module.exports = router;
