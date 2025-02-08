class TitleSection extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    
    this._title = this.getAttribute('title');
    this._textButton = this.getAttribute('textButton');
    
    this.render()
  }
  
  static get observedAttributes() {
    return ['title', 'textButton'];
  }
  
  set title(value) {
    this._title = value;
  }
  
  get title() {
    return this._title;
  }
  
  set textButton(value) {
    this._textButton = value;
  }
  
  get textButton() {
    return this._textButton;
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'title':
        this.title = newValue;
        break;
      case 'textButton':
        this.textButton = newValue;
        break;
    }
    
    this.render();
  }
  
  connectedCallback() {
    this.addEventListeners();
  }
  
  disconnectedCallback() {
    this.removeEventListeners();
  }
  
  addEventListeners() {
    const button = this.shadowRoot.querySelector('.action-button');
    if (button) {
      button.addEventListener('click', this.handleButtonClick);
    }
  }

  removeEventListeners() {
    const button = this.shadowRoot.querySelector('.action-button');
    if (button) {
      button.removeEventListener('click', this.handleButtonClick);
    }
  }
  
  handleButtonClick = (event) => {
    event.preventDefault();

    const notesSectionElement = document.querySelector('#notesSection');
    const formSectionElement = document.querySelector('#formSection');

    const isBackButton = this._textButton.toLowerCase() === 'back';

    if (isBackButton) {
      notesSectionElement.hidden = false;
      formSectionElement.hidden = true;
    } else {
      notesSectionElement.hidden = true;
      formSectionElement.hidden = false;
    }
  };
  
  _updateStyle() {
    this._style.textContent = `
      .title-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
      }

      .title-section h2 {
        font-weight: normal;
      }

      .action-button {
        display: inline-block;
        
        width: 96px;
        height: 34px;
        
        border-radius: 4px;
        border: 1px solid #aaa;
        
        color: white;
        font-size: 14px;
        line-height: 34px;
        text-align: center;
        text-decoration: none;
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
      <div class="title-section">
        <h2>${this._title}</h2>
        <a href="#" class="action-button">${this._textButton}</a>
      </div>
    `;
    
    this.addEventListeners();
  }
}

customElements.define("title-section", TitleSection);
