(function () {
    const currentDocument = document.currentScript.ownerDocument;

    class MovieListDetail extends HTMLElement {
        constructor() {
            super();

            // Setup a click listener to show/hide extra info
            this.addEventListener('click', e => {
                this.toggleCard();
            });
        }

        // Called when element is inserted in DOM
        connectedCallback() {
            const shadowRoot = this.attachShadow({mode: 'open'});
            const template = currentDocument.querySelector('#movie-list-detail');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

        // calls the rendering function and passes API data
        updateMovieDetails(movie) {
            this.render(movie);
        }

        // adds the information to the card
        render(movie) {
            this.shadowRoot.querySelector('.card__title').innerHTML = movie.title;
            this.shadowRoot.querySelector('.card__release-date').innerHTML = movie.release_date;
            this.shadowRoot.querySelector('.card__opening').innerHTML = movie.opening_crawl;
            this.shadowRoot.querySelector('.card__more-info').innerHTML = movie.title;
        }

        // shows more information
        toggleCard() {
            let elem = this.shadowRoot.querySelector('.card__hidden-content');
            let btn = this.shadowRoot.querySelector('.card__details-btn');
            btn.innerHTML = elem.style.display === 'none' ? 'Less Details' : 'More Details';
            elem.style.display = elem.style.display === 'none' ? 'block' : 'none';
        }
    }

    customElements.define('movie-list-detail', MovieListDetail);
})();