import os
import openai
from dotenv import load_dotenv

load_dotenv()

# Set API Key
openai.api_key = os.getenv('OPENAI_API_KEY')


def chatbot():
    print("ChatGPT, at your service. You can start the conversation now.")
    message = ""

    while message.lower() != 'quit':
        message = input("You: ")

        # Send the message to the Chat models
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # use the latest available model
            messages=[
                {"role": "system", "content": "You are a helpful assistant based in Hanoi, Vietnam. Just answer don't explain."},
                {"role": "user", "content": message}
            ]
        )

        # Print the chatbot's reply
        print("ChatGPT: ", response['choices'][0]['message']['content'])


chatbot()
