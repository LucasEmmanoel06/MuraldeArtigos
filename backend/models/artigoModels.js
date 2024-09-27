const mongoose = require('mongoose');

const artigoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  conteudo: { type: String, required: true },
  dataPublicacao: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Artigo', artigoSchema);