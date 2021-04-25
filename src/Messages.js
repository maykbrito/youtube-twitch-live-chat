import { Storage } from './Storage.js';
import { parseEmotes } from './Emotes.js';

const Messages = {
  data: Storage.get('messages'),
  save() {
    Storage.set('messages', Messages.data)
  },
  start() {
    Messages.data.reverse().map(Messages.render)
  },
  render({ tags, message, channel }) {
    const div = document.querySelector('div')
    
    const channelClasses = Messages.channelClasses(channel).join(" ")

    message = parseEmotes(message, tags)
    
    const content = `
    <p class="mb-4 p-4 shadow bg-gray-800 text-white">
      <span class="text-gray-400 text-sm uppercase mr-4 block tracking-wide ${channelClasses}">${channel}</span>
      <span style="color: ${tags.color}"> ${tags['display-name']}</span>: ${message} 
    </p>`
    
    div.innerHTML = content + div.innerHTML;
  },
  channelClasses(name) {
    const channels = {
      "#jakeliny": ["text-pink-500"],
      "#maykbrito": ["text-green-500"],
      "#thaissacandella": ["text-purple-400"],
      "#maiattodev": ["text-blue-500"],
    }

    return channels[name]
  }
}

export { Messages };