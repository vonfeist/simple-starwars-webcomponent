(function () {
    const currentDocument = document.currentScript.ownerDocument;


    class FilterButton extends HTMLElement {
        constructor() {
            super();
            // Setup a click listener on <filter-button>
            this.addEventListener('click', e => {
                const value = this.getAttribute('filter');
                const _name = this.getAttribute('name');
                this._filterMovies(value);
            });

            this.state = {};
        }

        static get observedAttributes() {
            return ['name'];
        }

        _filterMovies(value) {
            console.log('filter', value);
        }

        connectedCallback() {
            // Create a Shadow DOM using our template
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#movie-filter-button');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

        attributeChangedCallback(attr, oldValue, newValue) {
            console.log(`${attr} was changed from ${oldValue} to ${newValue}!`)
        }

        set name(value) {
            this._name = value;
            if (this.shadowRoot)
                this.shadowRoot.querySelector('#movie-filter-button').innerHTML = value;
        }

        get name() {
            return this._name;
        }
    }

    customElements.define('filter-button', FilterButton);
})();

