(async () => {
    const res = await fetch('/components/StarWarsApp/StarWarsApp.html');
    const textTemplate = await res.text();
    const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
        .querySelector('template');

    class StarWarsApp extends HTMLElement {
        constructor() {
            super();
            this.starWarsMovies = [];
        }

        async connectedCallback() {
            const shadowRoot = this.attachShadow({mode: 'open'});
            const instance = HTMLTemplate.content.cloneNode(true);
            shadowRoot.appendChild(instance);

            await _fetchAndPopulateData(this);
        }
    }

    customElements.define('star-wars-app', StarWarsApp);
})();

// Calls API to get movies
async function _fetchAndPopulateData(self) {
    let movieList = self.shadowRoot.querySelector('#movie-list');
    fetch(`https://swapi.co/api/films/`)
        .then((response) => response.json())
        .then((responseText) => {
            // sort results
            const list = responseText.results.sort((a,b ) => a.episode_id - b.episode_id);
            // set value of variable
            self.starWarsMovies = list;
            // Set the Attribute of web component
            movieList.list = list;

            _attachEventListener(self);
        })
        .catch((error) => {
            console.error(error);
        });
}

function _attachEventListener(self) {
    let movieDetail = self.shadowRoot.querySelector('#movie-list-detail');

    // show first rendered movie
    movieDetail.updateMovieDetails(self.starWarsMovies[0]);
    // Watch for the event on the shadow DOM
    self.shadowRoot.addEventListener('MovieClicked', (e) => {
        // e contains the movieId
        // updates the detail info about the movie
        self.starWarsMovies.forEach(movie => {
            if (movie.episode_id === e.detail.movieId) {
                // Update the movieDetail component to reflect the click
                movieDetail.updateMovieDetails(movie);
            }
        })

    })
}