import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const { prompt } = await req.json()
  let result: any = ''

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })
    result = chatCompletion.data.choices[0].message.content
  } catch (error) {
    if (error.response) {
      console.log(error.response)
      result = 'Someting wrong'
    } else {
      // console.log(error.message)
      result = error.message
    }
  }

  return NextResponse.json({ result })
}
