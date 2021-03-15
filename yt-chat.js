const YoutubeChat = require('./lib/client')

const client = new YoutubeChat({ channelId: "UCWIjwxPGrQmZYXABOa8_chQ"})

client.connect();

client.on('start', (liveId) => 
  console.log('live has started:', liveId))

client.on('message', ({ message, author }) => {
  console.log(`${author}: ${message}`)
})