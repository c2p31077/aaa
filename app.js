const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // フロントエンドのHTMLファイルを置く場所

app.post('/ask-chatgpt', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003", // モデルの指定
      prompt: prompt,
      max_tokens: 100, // 応答の長さを調整
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // APIキーを挿入
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error calling OpenAI API');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
