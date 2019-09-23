(function () {
    const currentDocument = document.currentScript.ownerDocument;

    class MovieListDetail extends HTMLElement {
        constructor() {
            // If you define a constructor, always call super() first as it is required by the CE spec.
            super();

            // Setup a click listener on <user-card>
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

        // Creating an API function so that other components can use this to populate this component
        updateMovieDetails(movie) {
            this.render(movie);
        }

        // Function to populate the card(Can be made private)
        render(movie) {
            this.shadowRoot.querySelector('.card__title').innerHTML = movie.title;
            this.shadowRoot.querySelector('.card__release-date').innerHTML = movie.release_date;
            this.shadowRoot.querySelector('.card__opening').innerHTML = movie.opening_crawl;
        }

        toggleCard() {
            let elem = this.shadowRoot.querySelector('.card__hidden-content');
            let btn = this.shadowRoot.querySelector('.card__details-btn');
            btn.innerHTML = elem.style.display === 'none' ? 'Less Details' : 'More Details';
            elem.style.display = elem.style.display === 'none' ? 'block' : 'none';
        }
    }

    customElements.define('movie-list-detail', MovieListDetail);
})();