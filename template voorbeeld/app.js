
class BackgammonBord extends HTMLElement {
    shadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.applyTemplate();
        this.attachEventListeners();
    }

    attachEventListeners(){

    }

    applyTemplate(){
        const template = document.getElementById('template voorbeeld-bord');
        let clone = template.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);
    }
}
customElements.define('backgammon-bord', BackgammonBord);