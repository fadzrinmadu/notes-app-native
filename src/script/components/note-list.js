import Utils from '../utils.js';

class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  
  _column = 4;
  _gutter = 20;
  
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    
    this.render()
  }
  
  static get observedAttributes() {
    return ['column', 'gutter'];
  }
  
  set column(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;
    this._column = newValue;
  }
  
  get column() {
    return this._column;
  }
  
  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;
    this._gutter = newValue;
  }
  
  get gutter() {
    return this._gutter;
  }
  
  attributeChangeCallback(name, oldValue, newValue) {
    switch(name) {
      case 'column':
        this.column = newValue;
        break;
      case 'gutter':
        this.gutter = newValue;
        break;
    }
    
    this.render();
  }
  
  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      
      .list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      
        gap: ${this.gutter}px;
      }
    `;
  }
  
  _emptycontent() {
    this._shadowRoot.innerHTML = '';
  }
  
  render() {
    this._emptycontent();
    this._updateStyle();
    
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="list">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('note-list', NoteList);
