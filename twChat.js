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

client.on('message', (channel, tags, message, self) => {
  div.innerHTML += content(tags, message, channel);
  document.body.scrollTo({ top: 600 })
})