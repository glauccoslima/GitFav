// Importa a classe GithubUser para realizar buscas de usuários na API do GitHub.
import { GithubUser } from './GithubUser.js';

// Define a classe Favorites que gerencia a lista de usuários favoritos armazenados.
export class Favorites {
    // Construtor da classe que inicializa a instância com o elemento DOM especificado.
    constructor(root) {
        // Acessa o elemento raiz onde a interface dos favoritos será montada.
        this.root = document.querySelector(root);
        this.tbody = this.root.querySelector('table tbody');
        // Carrega os favoritos existentes do armazenamento local ao iniciar.
        this.load();
        // Inicializa a interface com base nos dados carregados.
        this.update();
    }

    // Carrega os dados de favoritos do localStorage ou inicializa uma lista vazia se nada estiver armazenado.
    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
    }

    // Salva a lista atual de favoritos no localStorage.
    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries));
    }

    // Adiciona um novo usuário aos favoritos após verificar sua existência no GitHub e na lista atual.
    async add(username) {
        // Verifica se o usuário já está na lista de favoritos para evitar duplicatas.
        const userExists = this.entries.some(entry => entry.login.toLowerCase() === username.toLowerCase());
        if (userExists) {
            alert('Usuário já favoritado!');
            return;
        }
        // Busca o usuário no GitHub utilizando a classe GithubUser.
        const githubUser = await GithubUser.search(username);
        if (!githubUser) {
            alert('Usuário não encontrado no GitHub.');
            return;
        }
        // Adiciona o usuário retornado ao início da lista de favoritos e atualiza o armazenamento e a interface.
        this.entries = [githubUser, ...this.entries];
        this.update();
        this.save();
    }

    // Remove um usuário específico da lista de favoritos e atualiza o armazenamento e a interface.
    delete(user) {
        this.entries = this.entries.filter(entry => entry.login !== user.login);
        this.update();
        this.save();
    }

    // Atualiza a interface do usuário, reconstruindo a lista de entradas visíveis.
    update() {
        // Remove todas as linhas da tabela antes de adicionar as novas.
        this.removeAllTr();
        // Verifica a visibilidade de elementos com base na existência de favoritos.
        this.verifyFavorites();
        // Adiciona cada usuário favorito como uma linha na tabela.
        this.entries.forEach(user => this.tbody.append(this.createRow(user)));
    }

    // Remove todas as linhas de tabela existentes, limpando a visualização.
    removeAllTr() {
        while (this.tbody.firstChild) {
            this.tbody.removeChild(this.tbody.firstChild);
        }
    }

    // Verifica se existem favoritos e ajusta a visibilidade dos elementos da interface.
    verifyFavorites() {
        const hasFavorites = this.entries.length > 0;
        document.querySelector('.zeroFav').classList.toggle('hide', hasFavorites);
        document.querySelector('.zeroFav').classList.toggle('noFav', !hasFavorites);
    }

    // Cria uma linha de tabela para um usuário favorito, adicionando informações e controles para remoção.
    createRow(user) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="user"><img src="https://github.com/${user.login}.png" alt="Imagem de ${user.name}">
            <a href="https://github.com/${user.login}" target="_blank"><p>${user.name}</p><span>/${user.login}</span></a></td>
            <td class="repositories">${user.public_repos}</td>
            <td class="followers">${user.followers}</td>
            <td><button class="remove">Remover</button></td>`;
        // Adiciona um evento de clique para remover o usuário da lista de favoritos.
        tr.querySelector('.remove').addEventListener('click', () => {
            this.delete(user);
        });
        return tr;
    }
}