const express = require('express');
const axios = require('axios');
const { AzureOpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.get('/', async (req, res) =>
{
    let joke = '';

    // Call the joke API
    try
    {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        joke = "<h2>Hey I got a joke:</h2>" + response.data.setup + "<br/>" + response.data.punchline;
    } catch (error)
    {
        console.error(error);
        res.status(500).send('Error retrieving joke');
    }


    let betterjoke = '';
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = process.env["AZURE_OPENAI_API_KEY"];
    const apiVersion = "2024-04-01-preview";
    const deployment = process.env["AZURE_OPENAI_MODEL"];
    const prompt = "You are a joke teller."
                 + "Your are with a friend."
                 + "This friend tells you a joke."
                 + "Based on this joke you invent a better one."
                 + "Your joke should be as short as the original one."
                 + "Here is the joke:"
                 + joke;

    // Call the Azure OpenAI API
    try
    {
        const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });  
        const result = await client.completions.create({ prompt, model: deployment, max_tokens: 128 });

        for (const choice of result.choices)
        {
            betterjoke += choice.text + "<br/>";
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Error retrieving better joke');
    }

    res.send(joke + "<br/><br/><h2>... ok, but I got a better joke:</h2>" + betterjoke);
});

app.listen(3000, () =>
{
    console.log('Server is running on port 3000');
});