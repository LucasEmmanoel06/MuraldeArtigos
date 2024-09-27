const apiUrl = 'http://localhost:5000/api/artigos';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  fetchArtigos();
  document.getElementById('artigoForm').addEventListener('submit', createArtigo);
});

function showCreateForm() {
  console.log('Show create form');
  document.getElementById('createForm').style.display = 'block';
}

function hideCreateForm() {
  console.log('Hide create form');
  document.getElementById('createForm').style.display = 'none';
}

async function fetchArtigos() {
  try {
    const response = await axios.get(apiUrl);
    const artigos = response.data;
    const artigosList = document.getElementById('artigosList');
    artigosList.innerHTML = '';
    artigos.forEach(artigo => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerHTML = `
        <h5>${artigo.titulo}</h5>
        <p><strong>Autor:</strong> ${artigo.autor}</p>
        <p>${artigo.conteudo}</p>
        <p><strong>Data de Publicação:</strong> ${new Date(artigo.dataPublicacao).toLocaleDateString()}</p>
        <button class="btn btn-danger" onclick="deleteArtigo('${artigo._id}')">Deletar</button>
      `;
      artigosList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
  }
}

async function createArtigo(event) {
  event.preventDefault();
  console.log('Create artigo');
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const conteudo = document.getElementById('conteudo').value;
  const dataPublicacao = document.getElementById('dataPublicacao').value;

  try {
    await axios.post(apiUrl, { titulo, autor, conteudo, dataPublicacao });
    fetchArtigos();
    hideCreateForm();
  } catch (error) {
    console.error('Erro ao criar artigo:', error);
  }
}

async function deleteArtigo(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    fetchArtigos();
  } catch (error) {
    console.error('Erro ao deletar artigo:', error);
  }
}

async function deleteAllArtigos() {
  try {
    await axios.delete(apiUrl);
    fetchArtigos();
  } catch (error) {
    console.error('Erro ao deletar todos os artigos:', error);
  }
}