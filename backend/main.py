from typing import Union
from fastapi import FastAPI, Body
import os
import openai
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
def chat(message: str = Body(...)):
    import pdb; pdb.set_trace()
    return chatbot(message)

def chatbot(message: str):
    print("ChatGPT, at your service. You can start the conversation now.")

    if (message.lower == 'quit'):
        return "See you again"

    # Send the message to the Chat models
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # use the latest available model
        messages=[
            {"role": "system", "content": "You are a helpful assistant based in Hanoi, Vietnam. Just answer don't explain."},
            {"role": "user", "content": message}
        ]
    )

    # Print the chatbot's reply
    return response['choices'][0]['message']['content']
