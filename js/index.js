// Importa a classe FavoritesView que gerencia a interface de usuários favoritos.
import { FavoritesView } from "./FavoritesView.js";

  // Assegura que o código só executa após o carregamento completo do HTML
  // Isso previne erros de manipulação de elementos que ainda não foram carregados.
  document.addEventListener('DOMContentLoaded', () => {
      // Inicializa a visualização dos favoritos no elemento com ID 'app'.
      // Isso vincula todas as funcionalidades de interação de usuário à parte visual correspondente da aplicação.
      new FavoritesView('#app');
  });
