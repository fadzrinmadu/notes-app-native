class Utils {
  static emptyElement(element) {
    element.innerHTML = '';
  }
  
  static showElement(element) {
    element.style.display = 'block';
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = 'none';
    element.hidden = true;
  }
  
  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }
  
  static getCreatedDate() {
    const date = new Date();
    const formattedDate = date.toISOString(); 
    return formattedDate;
  }
  
  static formatDate(dateString) {
    const date = new Date(dateString);
  
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}

export default Utils;
