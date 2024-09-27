const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const artigoRoutes = require('./routes/artigoRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoDBUri = process.env.MONGODB_URI;

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use('/api', artigoRoutes);

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});