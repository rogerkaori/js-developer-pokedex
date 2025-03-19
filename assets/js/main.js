const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Adicionando detalhes ao pokemon  
pokemonList.addEventListener('click', (event) => {
    const pokemonItem = event.target.closest('.pokemon');
    if (pokemonItem) {
        const pokemonName = pokemonItem.querySelector('.name').textContent;
        const pokemonNumber = pokemonItem.querySelector('.number').textContent;
        const pokemonImage = pokemonItem.querySelector('img').src;
        const pokemonTypes = Array.from(
            pokemonItem.querySelectorAll('.type')
        ).map((typeElement) => typeElement.textContent);

        // Cria um simples modal com os detalhes
        const modal = document.createElement('div');
        modal.className = 'pokemon-modal';
        modal.innerHTML = `
            <div class="pokemon-modal-content">
                <h2>${pokemonName} ${pokemonNumber}</h2>
                <img src="${pokemonImage}" alt="${pokemonName}">
                <p><strong>Tipos:</strong> ${pokemonTypes.join(', ')}</p>
                <button id="closeModal">Fechar</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Fecha o modal ao clicar no botão "Fechar"
        modal.querySelector('#closeModal').addEventListener('click', () => {
            modal.remove();
        });
    }
});
