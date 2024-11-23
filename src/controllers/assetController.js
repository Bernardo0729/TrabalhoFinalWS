const { Asset } = require('../models');

const getAssets = async (req, res) => {
    try {
        const assets = await Asset.findAll();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar ativos', error });
    }
};

const createAsset = async (req, res) => {
    try {
        const newAsset = await Asset.create(req.body);
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ativo', error });
    }
};

const updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ message: 'Ativo não encontrado' });
        await asset.update(req.body);
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar ativo', error });
    }
};

const deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ message: 'Ativo não encontrado' });
        await asset.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar ativo', error });
    }
};

module.exports = { getAssets, createAsset, updateAsset, deleteAsset };
