import { Favorites } from "./favorites.js";

// FavoritesView gerencia interações do usuário para o sistema de favoritos, extendendo as funcionalidades básicas de Favorites.
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root); // Inicializa a classe base com o elemento raiz do DOM.
        this.tbody = this.root.querySelector('table tbody'); // Acessa a tabela para manipulações diretas.
        this.update();  // Atualiza a visualização inicial com base nos dados atuais.
        this.onAdd();   // Configura os manipuladores de eventos para adicionar favoritos.
    }

    // Configura a interatividade para adicionar novos favoritos, tanto via botão quanto via tecla Enter.
    onAdd() {
        const addButton = this.root.querySelector('.search button'); // Botão para adicionar favoritos.
        const input = this.root.querySelector('.search input'); // Campo de entrada para nome de usuário do GitHub.

        addButton.onclick = () => this.add(input.value.trim()); // Adiciona o favorito ao clicar no botão.

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { // Permite adicionar favorito também pressionando Enter.
                e.preventDefault();  // Evita o comportamento padrão do Enter em formulários.
                this.add(input.value.trim());
            }
        });
    }
}
