'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
export type Chat = {
  role: 'assistant' | 'user'
  content: string
}

export default function Home() {
  const [chats] = useState([])
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const bubbleSideClassName = (role: string) => {
    return 'chat chat-' + (role === 'assistant' ? 'start' : 'end')
  }

  const bubbleColorClassName = (role: string) => {
    return 'chat-bubble ' + (role === 'assistant' ? '' : 'chat-bubble-primary')
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

    setLoading(true)

    axios
      .post('/api/completion', { prompt: prompt, history: chats }, axiosConfig)
      .then((response) => {
        chats.push({ role: 'user', content: prompt })
        chats.push({ role: 'assistant', content: response.data.result })
      })
      .finally(() => {
        setLoading(false)
        setPrompt('')
      })
  }

  return (
    <>
      <div className="p-8 flex justify-center">
        <section className="w-6/12">
          <div className="chat chat-start">
            <div className="chat-bubble">
              Hi, I am Chatbot powered by ChatGPT - Ask me anything!
            </div>
          </div>
          {chats.map((chat, index) => (
            <div className={bubbleSideClassName(chat.role)} key={index}>
              <div className={bubbleColorClassName(chat.role)}>{chat.content}</div>
            </div>
          ))}
        </section>
      </div>

      <div className="p-4 flex justify-center">
        <section className="w-6/12">
          <hr className="border-gray-900" />
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
            <button className="btn" onClick={submitPrompt} disabled={loading}>
              {!loading ? 'Submit' : 'Loading...'}
            </button>
          </form>
        </section>
      </div>
    </>
  )
}
