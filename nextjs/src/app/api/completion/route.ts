import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const delimiter = '####'
  const systemMessage = {
    role: 'system',
    content: `You are an AI assistant that help with any users' queries.
    The users' query will be delimited with ${delimiter} characters.
    asdass`,
  }
  const { prompt, history } = await req.json()
  let result: any = ''
  history.unshift(systemMessage)
  history.push({ role: 'user', content: prompt })

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: history,
    })
    console.log(chatCompletion.data.choices)
    result = chatCompletion.data.choices[0].message.content
  } catch (error) {
    if (error.response) {
      console.log(error.response)
      result = 'Someting wrong'
    } else {
      result = error.message
    }
  }

  return NextResponse.json({ result })
}
