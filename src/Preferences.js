const querys = location.search;
const queryURL = new URLSearchParams(querys);

const Preferences = {
  start() {
    const body = document.querySelector('body');
    const { background, messageBackgournd, textColor } = this.getAll();

    body.style.background = background;

    const cardMessages = document.querySelectorAll('.card-message');

    cardMessages.forEach((message, index) => {
      message.style.background = messageBackgournd;
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
      background: this.get("bg-color"),
      messageBackgournd: this.get("msgbox-color"),
      textColor: this.get("text-color"),
    }
  },
}

export { Preferences }