# AI_Chat

This is a chatbot that uses OpenAi API to generate responses to user input. It is a simple implementation of the GPT-3 model.

###
Try the demo [here](https://ai-chat-gigioxx.vercel.app/)!

## Installation

### Install server dependencies

```
cd server
pnpm install
```

### Configure environment variables

Replace the values in the .env file with your own values.
You can get your OpenAi API key from [here](https://beta.openai.com/account/api-keys).

```
OPENAI_API_KEY=
```

### Run the server

```
pnpm run server
```

### Install client dependencies

```
cd client
pnpm install
```

### Run the client

```
pnpm run dev
```

## Usage

Go to http://localhost:5173/ to use the chatbot.
Ask anything you want and the chatbot will respond.
