const { EventEmitter } = require('events');
const { inherits } = require('util');
const axios = require('axios');

const YoutubeChat = function({ channelId }) {
  this.channelId = channelId;
  this.headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'}
  this.liveURL = `https://www.youtube.com/channel/${channelId}/live`
}

YoutubeChat.prototype.start = async function() {
  const liveResponse = await axios.get(this.liveURL, {headers: this.headers})
  
  if (liveResponse.data.match(/LIVE_STREAM_OFFLINE/)) {
    this.emit('error', new Error("Live stream offline"))
    return false
  }
  const liveId = liveResponse.data.match(/"watchEndpoint":{"videoId":"(\S*?)"}/)
  this.liveId = liveId ? liveId[1] : "";

  if (!this.liveId) {
    this.emit('error', new Error('Live stream not found'))
    return false
  }

  this.observer = setInterval(() => this.fetchChat(), this.interval)

  this.emit('start', this.liveId)

  return true;
}

inherits(YoutubeChat, EventEmitter);

const ytChat = new YoutubeChat({ channelId: "UCSf-NCzjwcnXErUBW_qeFvA"})
const isLive = ytChat.start();
console.log(isLive)
ytChat.on('start', (liveId) => console.log('live has started: ', liveId))