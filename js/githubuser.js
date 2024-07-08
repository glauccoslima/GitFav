// Classe responsável por interagir com a API do GitHub para buscar usuários.
export class GithubUser {
  // Método estático para buscar informações de usuário no GitHub.
  static async search(username) {
      // Constrói o URL para a API do GitHub, especificando o usuário a ser pesquisado.
      const endpoint = `https://api.github.com/users/${username}`;
      try {
          // Realiza a chamada à API e aguarda a resposta.
          const response = await fetch(endpoint);
          // Verifica se a resposta não foi bem-sucedida (usuário não encontrado ou outro erro).
          if (!response.ok) {
              // Se o usuário não for encontrado, retorna null.
              if (response.status === 404) {
                  return null;
              }
              // Lança um erro se houver um problema com a solicitação.
              throw new Error(`Erro ao buscar usuário: ${response.status} ${response.statusText}`);
          }
          // Converte a resposta da API para JSON.
          const data = await response.json();
          // Verifica se a resposta contém os dados mínimos necessários.
          if (!data.login) {
              throw new Error("Dados insuficientes retornados pela API.");
          }
          // Retorna um objeto contendo os dados principais do usuário.
          return {
              login: data.login,
              name: data.name,
              public_repos: data.public_repos,
              followers: data.followers
          };
      } catch (error) {
          // Registra e propaga erros relacionados à busca de usuários.
          console.error('Falha ao buscar usuário do GitHub:', error);
          throw error;
      }
  }
}
