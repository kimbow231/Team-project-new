const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "API_KEY";
const API_URL = "https://api.openai.com/v1/chat/completions";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4.1-mini",
        messages: [
          { 
            role: "system", 
            content: "Keep your response under 200 words."
          },
          { 
            role: "user", 
            content: userMessage 
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        }
      }
    );

    res.json({
      reply: response.data.choices[0].message.content
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));