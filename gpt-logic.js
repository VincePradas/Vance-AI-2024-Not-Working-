const axios = require('axios')

async function interactWithChatGPT(prompt) {
    const apiKey = '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'; // Replace 'YOUR_API_KEY' with your actual API key
  
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to fetch response from the API');
      }
  
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error interacting with the API:', error);
      return null;
    }
  }

