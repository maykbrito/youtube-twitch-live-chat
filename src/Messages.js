import { Storage } from './Storage.js';

const Messages = {
  data: Storage.get('messages'),
  save() {
    Storage.set('messages', Messages.data)
  },
  start() {
    Messages.data.map(Messages.render)
  },
  render({ tags, message, channel }) {
    const div = document.querySelector('div')
    const content = `
    <p class="mb-8">
      <strong class="text-bold mr-4">${channel} </strong>
      <span style="color: ${tags.color}"> ${tags['display-name']}</span>: ${message} 
    </p>`
    div.innerHTML = content + div.innerHTML;
  }
}

export { Messages };