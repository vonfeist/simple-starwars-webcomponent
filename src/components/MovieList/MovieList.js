const currentDocument = document.currentScript.ownerDocument;

(async () => {
        const res = await fetch('/components/MovieList/MovieList.html');
        const textTemplate = await res.text();
        const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
            .querySelector('template');

        class MovieList extends HTMLElement {
            constructor() {
                super();
            }

            connectedCallback() {
                // Create a Shadow DOM using our template
                const shadowRoot = this.attachShadow({mode: 'open'});
                const instance = HTMLTemplate.content.cloneNode(true);
                shadowRoot.appendChild(instance);

            }

            get list() {
                return this._list;
            }

            set list(list) {
                this._list = list;
                this.render();
            }

            render() {
                let ulElement = this.shadowRoot.querySelector('.movie-list__items');
                ulElement.innerHTML = '';

                this.list.forEach(movie => {
                    let li = _createMovieListElement(this, movie);
                    ulElement.appendChild(li);
                });
            }
        }

        function _createMovieListElement(self, movie) {
            let li = currentDocument.createElement('LI');
            li.innerHTML = movie.title;
            li.className = 'movie-list__item';
            li.onclick = () => {
                let event = new CustomEvent("MovieClicked", {
                    detail: {
                        movieId: movie.episode_id
                    },
                    bubbles: true
                });
                self.dispatchEvent(event);
            };
            return li;
        }

        customElements.define('movie-list', MovieList);
    }
)();

