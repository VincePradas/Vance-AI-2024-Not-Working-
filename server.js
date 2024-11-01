// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const apiKeysPath = path.join(__dirname, 'json', 'api_config.json');
const apiKeys = JSON.parse(fs.readFileSync(apiKeysPath));
const openaiApiKey = apiKeys.openai;

const configuration = new Configuration({
  apiKey: openaiApiKey,
});

app.post('/api/message', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Please provide a message for the AI to respond to." });
  }

  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          "role": "system",
          "content": `you're a very smart and helpful assistant and you answer directly on point on what the question is and direct to the point with no extra words or sentences that in unecessary, also act like a human.`
        },
        {
          "role": "user",
          "content": `${query}?`
        }
      ],
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    });

    const assistantResponse = response.data.choices[0].message.content;
    return res.status(200).json({ response: assistantResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while processing your request. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
