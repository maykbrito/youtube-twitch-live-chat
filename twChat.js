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

const printMessage = ({ tags, message, channel }) => {
  div.innerHTML = content(tags, message, channel) + div.innerHTML;
  document.body.scrollTo({ top: 600 })
}

const isQuestion = message => message.includes("#pergunta") ? true : false
const saveQuestion = ({ tags, message, channel }) => questions.unshift({ channel, tags, message })
const printQuestionInConsoleLog = questions => questions.forEach(
  question =>
    console.log(`${question.channel} - ${question.tags['display-name']} - ${question.message}`)
)

client.on('message', (channel, tags, message, self) => {
  const messageData = { tags, message, channel }

  if (message.includes("#pergunta")) {
    console.clear()
    saveQuestion(messageData)
    printQuestionInConsoleLog(questions)
  } else {
    printMessage(messageData)
    messages.unshift(messageData)
  }

})
