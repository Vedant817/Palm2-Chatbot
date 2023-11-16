const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

const LANGUAGE_MODEL_API_KEY = process.env.LANGUAGE_MODEL_API_KEY
const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`

app.get('/prompt/:text', async (req, res) => {
    const text = req.params.text
    const payload = {
        prompt: {
            "messages": [
                {
                    "content": text
                }
            ]
        },
        temperature: 0.1,
        candidate_count: 1,
    }
    try {
        const response = await fetch(new URL(LANGUAGE_MODEL_URL), {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
            method: "POST",
        })
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("An Error has occurred")
    }
})

app.listen(PORT, () => {
    console.log("Server Started");
});
