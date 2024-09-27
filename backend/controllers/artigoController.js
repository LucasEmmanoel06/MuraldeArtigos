const Artigo = require('../models/artigoModels');

exports.getArtigos = async (req, res) => {
  try {
    const artigos = await Artigo.find();
    res.json(artigos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar artigos', error: error.message });
  }
};

exports.createArtigo = async (req, res) => {
  try {
    const novoArtigo = new Artigo(req.body);
    await novoArtigo.save();
    res.json(novoArtigo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar artigo', error: error.message });
  }
};

exports.updateArtigo = async (req, res) => {
  try {
    const artigoAtualizado = await Artigo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!artigoAtualizado) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    res.json(artigoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar artigo', error: error.message });
  }
};

exports.deleteArtigo = async (req, res) => {
  try {
    const artigo = await Artigo.findByIdAndDelete(req.params.id);
    if (!artigo) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    res.json({ message: 'Artigo deletado' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar artigo', error: error.message });
  }
};

exports.deleteAllArtigos = async (req, res) => {
  try {
    await Artigo.deleteMany({});
    res.json({ message: 'Todos os artigos foram deletados' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar todos os artigos', error: error.message });
  }
};