'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
export type Chat = {
  sender: 'bot' | 'you'
  msg: string
}
export default function Home() {
  const defaultChats: Chat[] = [{ sender: 'bot', msg: "Hello it's ChatBot - Ask me anything!" }]
  const [chats] = useState(defaultChats)
  const [prompt, setPrompt] = useState('')

  const bubbleSideClassName = (sender: string) => {
    return 'chat chat-' + (sender === 'bot' ? 'start' : 'end')
  }

  const bubbleColorClassName = (sender: string) => {
    return 'chat-bubble ' + (sender === 'bot' ? '' : 'chat-bubble-primary')
  }

  useEffect(() => {
    console.log('Home page')
  })

  const submitPrompt = () => {
    const axiosConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
    }

    axios
      .post('/api/completion', { prompt: prompt }, axiosConfig)
      .then((response) => {
        chats.push({ sender: 'you', msg: prompt })
        chats.push({ sender: 'bot', msg: response.data.result })
      })
      .finally(() => setPrompt(''))
  }

  return (
    <div className="p-8 flex justify-center">
      <div></div>
      <section className="basic-1/2">
        {chats.map((chat, index) => (
          <div className={bubbleSideClassName(chat.sender)} key={index}>
            <div className={bubbleColorClassName(chat.sender)}>{chat.msg}</div>
          </div>
        ))}
      </section>
      <div></div>

      {/* <div className="w-6/12">
        <hr />
        <form action="#" className="relative" onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <br />
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <br />
          </div>
          <button className="btn" onClick={submitPrompt}>
            Submit
          </button>
        </form>
      </div> */}
    </div>
  )
}
