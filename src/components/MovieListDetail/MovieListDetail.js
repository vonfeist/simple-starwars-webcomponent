(async () => {
    const res = await fetch('/components/MovieListDetail/MovieListDetail.html');
    const textTemplate = await res.text();
    const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
        .querySelector('template');

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
            const instance = HTMLTemplate.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

        // calls the rendering function and passes API data
        updateMovieDetails(movie) {
            this.render(movie);
        }

        // adds the information to the card
        render(movie) {
            if (movie) {
                this.shadowRoot.querySelector('.card__user-card-container').removeAttribute('hidden');
                this.shadowRoot.querySelector('.card__title').innerHTML = movie.title;
                this.shadowRoot.querySelector('.card__release-date').innerHTML = '(' + movie.release_date + ')';
                this.shadowRoot.querySelector('.card__opening').innerHTML = movie.opening_crawl;
                this.shadowRoot.querySelector('.card__more-info__director').innerHTML = movie.director;
                this.shadowRoot.querySelector('.card__more-info__episode').innerHTML =  movie.episode_id;
            }
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