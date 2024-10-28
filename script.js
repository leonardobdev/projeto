// script.js

const cadastroForm = document.getElementById('cadastro');
const loginForm = document.getElementById('login');
const estoqueForm = document.getElementById('estoqueForm'); // Assumindo que você adicionou um formulário para adicionar novos produtos
const tabelaProdutos = document.getElementById('tabela-produtos');

// Função para enviar uma requisição POST para o backend
async function enviarDados(url, dados) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar dados');
    }

    const data = await response.json();
    console.log(data); // Lidar com a resposta do backend (exibir mensagem de sucesso, atualizar tabela)
  } catch (error) {
    console.error(error);
    // Exibir mensagem de erro para o usuário
  }
}

// Exemplo de envio de dados do formulário de cadastro
cadastroForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  // ... outros campos

  const dados = {
    nome,
    email,
    // ... outros dados
  };

  enviarDados('/api/cadastrar', dados); // Substitua '/api/cadastrar' pela URL correta do seu backend
});

// ... outros event listeners para os formulários de login e estoque

// Função para atualizar a tabela de produtos (chamada após receber a resposta do backend)
function atualizarTabelaProdutos(produtos) {
  // Limpar a tabela
  tabelaProdutos.innerHTML = '';

  // Adicionar novas linhas à tabela
  produtos.forEach(produto => {
    const novaLinha = document.createElement('tr');
    // ... adicionar células com os dados do produto
    tabelaProdutos.appendChild(novaLinha);
  });
}

// Função para buscar os produtos no backend
async function buscarProdutos() {
  try {
    const response = await fetch('/api/produtos'); // Substitua '/api/produtos' pela URL correta da sua API
    const produtos = await response.json();

    // Limpar a tabela antes de adicionar novos dados
    tabelaProdutos.innerHTML = '';

    // Criar as linhas da tabela para cada produto
    produtos.forEach(produto => {
      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        `;
      tabelaProdutos.appendChild(novaLinha);
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    // Exibir uma mensagem de erro para o usuário
  }
}

// Chamar a função para buscar os produtos ao carregar a página
buscarProdutos();