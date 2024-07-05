# tell-me-a-better-joke

This is a sample application that demonstrate the usage of a GPT Completion API.  
It ask for a joke from `https://official-joke-api.appspot.com/random_joke`, and then use the GPT Completion API to generate a better joke.  
The solution is based on Node.js, Express.js and use an Azure OpenAI instance that you should provide.

Required Environment Variables:
- `AZURE_OPENAI_ENDPOINT`   Your Azure OpenAI API's endpoint, something such as `https://YOUR_INSTANCE_NAME.openai.azure.com/`
- `AZURE_OPENAI_API_KEY`    Your Azure OpenAI API's key related to your endpoint (sorry, no example here)
- `AZURE_OPENAI_MODEL`      The name of your Completion model deployed in your Azure OpenAI instance, such as `gpt-3.5t-instruct`
- `APP_LISTENING_PORT`      The port your app is listening to, default to `3000`