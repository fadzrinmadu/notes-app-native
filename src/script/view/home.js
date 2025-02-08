import Utils from '../utils.js';
import notes from '../data/local/notes.js';

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

const home = () => {
  const notesSectionElement = document.querySelector('#notesSection');
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const formSectionElement = document.querySelector('#formSection');
  const noteFormElement = document.querySelector("note-form");
  
  const displayData = () => {
    showFormLayout(false)
    
    const noteItems = notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = {
        id: note.id,
        title: note.title,
        description: note.body,
        date: note.createdAt,
      };
      return noteItemElement;
    });
    
    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItems);
  }
  
  const showFormLayout = (showForm) => {
    notesSectionElement.hidden = showForm;
    formSectionElement.hidden = !showForm;
  }
  
  noteFormElement.addEventListener("note-added", () => {
    displayData();
    showFormLayout(false);
    showToast("Catatan berhasil ditambahkan!");
  });
  
  displayData();
};

export default home;
