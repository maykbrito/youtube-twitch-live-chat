const client = new tmi.Client(
  {
    connection: { reconnect: true },
    channels: ['maykbrito', 'jakeliny']
  }
);
client.connect().catch(console.error);

const div = document.querySelector('div')
const content = (tags, message, channel) => `
    <p class="mb-8">
      <strong class="text-bold mr-4">${channel} </strong><span style="color: ${tags.color}"> ${tags['display-name']}</span>: ${message} </p>
      `

const messages = []
const questions = []

const printMessage = (tag, message, channel) => {
  div.innerHTML = content(tag, message, channel) + div.innerHTML;
  document.body.scrollTo({ top: 600 })
}

client.on('message', (channel, tags, message, self) => {
  printMessage(tags, message, channel)
  messages.unshift({ channel, tags, message })

  if (message.includes("#pergunta")) {
    console.log(message)
    questions.push({ channel, tags, message })
  }
})
