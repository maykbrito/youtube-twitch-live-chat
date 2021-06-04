const querys = location.search
const queryURL = new URLSearchParams(querys)

const Preferences = {
  start() {
    const body = document.querySelector('body');
    const { background, messageColor, textColor } = this.getAll();

    body.style.background = background;

    const cardMessages = document.querySelectorAll('.card-message');

    cardMessages.forEach((message, index) => {
      messageColor && message.classList.remove("bg-gray-800");
      textColor && message.classList.remove("text-white");
  
      message.style.background = messageColor;
      message.style.color = textColor;
    });
  },
  get(params) {
    const paramsHasPresent = queryURL.has(params)

    if(!paramsHasPresent) return
    
    const userPreference = queryURL.get(params)

    if(userPreference === "none") return "none"

    return `#${userPreference}`
  },
  getAll() {
    return {
      background: this.get("bg"),
      messageColor: this.get("msg"),
      textColor: this.get("text"),
    }
  },
}

export { Preferences }