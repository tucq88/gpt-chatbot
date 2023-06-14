import { useState } from 'react'
import './App.css'
import { createContext } from 'react';
import { Chat } from './types';
import axios from 'axios';
export const ChatContext = createContext(1);

function App() {
  const defaultChats: Chat[] = [
    {sender: 'bot', msg: "Hello it's ChatBot - Feel free to ask me!"},
  ]
  const [chats] = useState(defaultChats)
  const [prompt, setPrompt] = useState('')

  const bubbleSideClassName = (sender: string) => {
    return "chat chat-" + (sender === 'bot' ? "start" : "end")
  }

  const bubbleColorClassName = (sender: string) => {
    return "chat-bubble " + (sender === 'bot' ? "" : "chat-bubble-primary")
  }

  const submitPrompt = () => {
    const axiosConfig = {headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "multipart/form-data",
      }}

    axios.post('http://127.0.0.1:8000', {message: prompt}, axiosConfig)
        .then(response => {
            chats.push({sender: 'you', msg: prompt})
            chats.push({sender: 'bot', msg: response.data})
        }).finally(() => setPrompt(''));
}

  return (
    <>
      <div>
      {chats.map( (chat, index) => (
        <div className={bubbleSideClassName(chat.sender)} key={index}>
          <div className={bubbleColorClassName(chat.sender)}>
            {chat.msg}
          </div>
        </div>
      ))}
        <hr />
        <div className="min-w-0 flex-1">
          <form action="#" className="relative" onSubmit={e => e.preventDefault()}>
            <div className="form-control">
            <br />
                <textarea className="textarea textarea-bordered h-24"
                    placeholder="Enter your prompt"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                ></textarea>
            <br />
            </div>
            <button className="btn" onClick={submitPrompt}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
