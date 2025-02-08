class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }
  
  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
      }
        
      .wrapper {
        padding: 18px 24px;
        border-bottom: 1px solid #aaa;
      }
        
      .brand-name {
        margin: 0;
      }
    `;
  }
  
  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    this._emptyContent();
    this._updateStyle();
    
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="wrapper">
        <h1 class="brand-name">Notes App</h1>
      <div>
    `;
  }
}

customElements.define('app-bar', AppBar);
