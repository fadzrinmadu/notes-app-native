import Utils from '../utils.js';

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    description: null,
    date: null,
  };
  
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }
  
  set note(value) {
    this._note = value;
    this.render();
  }
  
  get note() {
    return this._note;
  }
  
  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  
  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        border-radius: 4px;
        border: 1px solid #aaa;
        overflow: hidden;
      }
        
      .note {
        padding: 12px;
      }
        
      .note-title {
        margin: 0;
        margin-bottom: 4px;
        
        font-size: 18px;
        font-weight: normal;
      }
        
      .note-date {
        display: inline-block;
        margin-bottom: 8px;
      
        color: #aaa;
        font-size: 12px;
        font-weight: normal;
      }
        
      .note-description {
        margin: 0;
        
        font-size: 14px;
        font-weight: normal;
      }
    `;
  }
  
  render() {
    this._emptyContent();
    this._updateStyle();
    
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="note">
        <h3 class="note-title">${this._note.title}</h3>
        <time class="note-date">${Utils.formatDate(this._note.date)}</time>
        <p class="note-description">${this._note.description}</p>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);
