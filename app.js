const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 静的ファイル（HTMLファイルなど）を提供
app.use(express.static('public'));

// POSTリクエストを処理するためにJSONをパース
app.use(express.json());

// OpenAIのAPIに接続
app.post('/ask-chatgpt', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error calling OpenAI API');
    }
});

// サーバーの起動
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
