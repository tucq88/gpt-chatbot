import { useState } from 'react'
import Prompt from './Prompt'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const chats = [
    {sender: 'bot', msg: "Hello it's ChatBot - Feel free to ask me!"},
    {sender: 'you', msg: "Hallo"},
    {sender: 'bot', msg: "OK"},
    {sender: 'bot', msg: "Thank you"},
    {sender: 'you', msg: "Hallo2"},
    {sender: 'you', msg: "Hallo3"},
  ]

  const bubbleSideClassName = (sender: string) => {
    return "chat chat-" + (sender === 'bot' ? "start" : "end")
  }

  const bubbleColorClassName = (sender: string) => {
    return "chat-bubble " + (sender === 'bot' ? "" : "chat-bubble-primary")
  }



  return (
    <>
      <div>
      {chats.map(chat => (
        <div className={bubbleSideClassName(chat.sender)}>
          <div className={bubbleColorClassName(chat.sender)}>
            {chat.msg}
          </div>
        </div>
      ))}

        {/* <div className="chat chat-start">
          <div className="chat-bubble">Hello it's ChatBot - Feel free to ask me!</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-primary">You underestimate my power!</div>
        </div> */}
        <hr />
        <Prompt></Prompt>
      </div>
    </>
  )
}

export default App
