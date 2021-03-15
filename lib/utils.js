const Utils = {
  hasTextMessage: item =>  item.match(/{"text":"(\w.*)"}]},"authorName"/i),
  chatIsOffline(message) {
    let regex = /"contents":{"messageRenderer":{"text":/i
    return !!message.match(regex);
  },
  getNewMessages(item, prevTime) {
    let timestamp = item.match(/"timestampUsec":"(\d+)"/i)
    timestamp = timestamp ? timestamp[1] : null;
    return timestamp && Utils.usecToTime(timestamp) > prevTime
  },
  usecToTime: usec => Math.floor(Number(usec) / 1000)
}

module.exports = Utils;