import Utils from '../utils.js';
import notes from '../data/local/notes.js';

class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _titleInput = null;
  _descriptionInput = null;
  _titleValidationMessage = null;
  _form = null;
  
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }
  
  _updateStyle() {
    this._style.textContent = `
      input, 
      textarea, 
      button {
        display: block;
        width: 100%;
        padding: 12px;
        box-sizing: border-box;
        
        border: 1px solid #aaa;
        border-radius: 4px;
        background-color: #202124;
        
        color: white;
      }

      input::placeholder, 
      textarea::placeholder {
        font-size: 12px;
        font-weight: bold;
        font-family: inherit;
      }

      input {
        height: 42px;
      }
        
      input:user-invalid {
        border: 1px solid red;
      }

      textarea {
        height: 176px;
        resize: vertical;
      }

      button {
        height: 40px;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
      }

      .input-group {
        margin-bottom: 12px;
      }
        
      .validation-message {
        color: red;
        font-size: 12px;
      }
    `;
  }
  
  _emptyContent() {
    this.shadowRoot.innerHTML = '';
  }
  
  _validateField(input, messageElement, min, max) {
    const value = input.value.trim();
    let message = "";

    if (!value) {
      message = "This field is required.";
    } else if (value.length < min) {
      message = `Must be at least ${min} characters.`;
    } else if (value.length > max) {
      message = `Cannot exceed ${max} characters.`;
    }

    messageElement.textContent = message;
    messageElement.style.display = message ? "block" : "none";
  }

  _resetFormField() {
    this._titleInput.value = '';
    this._descriptionInput.value = '';
  }
  
  _addValidation() {
    this._titleInput.addEventListener("input", () => this._validateField(this._titleInput, this._titleValidationMessage, 3, 50));

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._validateField(this._titleInput, this._titleValidationMessage, 3, 50);

      if (!this._titleValidationMessage.textContent) {
        notes.push({
          id: `notes-${crypto.randomUUID()}`,
          title: this._titleInput.value,
          body: this._descriptionInput.value,
          createdAt: Utils.getCreatedDate(),
          archived: false,
        });

        this._resetFormField();
        this.dispatchEvent(new CustomEvent("note-added", { bubbles: true }));
      }
    });
  }
  
  _setupSelector() {
    this._form = this._shadowRoot.querySelector("form");
    this._titleInput = this._shadowRoot.querySelector("#title");
    this._descriptionInput = this._shadowRoot.querySelector('#description');
    this._titleValidationMessage = this._shadowRoot.querySelector("#titleValidation");
  }
  
  connectedCallback() {
    this.render();
    this._setupSelector();
    this._addValidation();
  }
  
  render() {
    this._emptyContent();
    this._updateStyle();
    
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <form>
        <div class="input-group">
          <input 
            id="title"
            type="text" 
            placeholder="Enter a note title..."
            aria-describedby="titleValidation"
          />
          <p id="titleValidation" class="validation-message" aria-live="polite"></p>
        </div>
        <div class="input-group">
          <textarea id="description" placeholder="Write your notes here..."></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    `;
  }
}

customElements.define('note-form', NoteForm);
