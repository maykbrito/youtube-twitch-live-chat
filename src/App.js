import { Messages } from './Messages.js';
import { Preferences } from './Preferences.js';

function App() {
  const client = new tmi.Client(
    {
      connection: { reconnect: true },
      channels: ['maykbrito', 'jakeliny', 'thaissacandella', 'maiattodev']
    }
  );

  client.connect().catch(console.error);

  const questions = []

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
      Messages.render(messageData)
      Messages.data.unshift(messageData)
      Messages.save()
    }
  })

  Messages.start()
  Preferences.start()
}

export { App }