const Parser = {
  formatUserMessage(message) {
    let text = message.match(/{"text":"(\w.*)"}]},"authorName"/i)
    text = text ? text[1] : null;
    
    let author = message.match(/{"simpleText":"(\w.*)"},"authorPhoto"/i)
    author = author ? author[1] : null;

    let timestamp = message.match(/"timestampUsec":"(\d+)"/i)
    timestamp = timestamp ? timestamp[1] : null;

    return {author, text, timestamp};
  }
}

module.exports = Parser;