const express = require("express");
const openai = require("openai");
const Chat = require("./database");
const dotenv = require("dotenv");
const router = express.Router();
const openai_api_key = "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";

// Initialize the OpenAI API instance with your API key
dotenv.config(); // Load the environment

const gpt_model = new openai({ key: openai_api_key });


//const gpt_model = new openai.OpenAIApi({ key: openai_api_key });

router.get("/", (req, res) => {
  res.render("chat");
});

router.post("/chat", async (req, res) => {
  const message = req.body.message;

  // Check grammar with OpenAI GPT API.
  const response = await gpt_model.Completions.create({
    engine: "text-davinci-002",
    prompt: message,
    temperature: 0.5,
    max_tokens: 150, // Use max_tokens to limit the response length.
  });
  const corrected_message = response.choices[0].text;

  // Save chat to MongoDB.
  const chat = new Chat({
    user: req.body.user,
    message: message,
    correctedMessage: corrected_message,
  });

  await chat.save();

  // Send response to the client.
  res.json({
    message: message,
    correctedMessage: corrected_message,
  });
});

exports.default = OpenAI;
module.exports = router;
