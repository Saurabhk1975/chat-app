const express = require("express");
const openai = require("openai");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
openai.apiKey = "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";

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for chat messages
const messageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  correctedMessage: String,
});

// Create a model for chat messages
const Message = mongoose.model("Message", messageSchema);

router.use(express.json());
//const gpt_model = new openai.OpenAIApi({ key: openai_api_key });

router.get("/", (req, res) => {
  res.render("chat");
});

router.post("/chat", async (req, res) => {
  const { sender, message } = req.body;

  // Use the OpenAI API to correct the message
  openai.completions
    .create({
      engine: "text-davinci-002",
      prompt: message,
      max_tokens: 50,
    })
    .then((response) => {
      const correctedMessage = response.choices[0].text;

      // Store the original and corrected message in MongoDB
      const newMessage = new Message({ sender, message, correctedMessage });
      newMessage.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error while storing the message");
        } else {
          res.status(200).send("Message sent");
        }
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error with OpenAI API");
    });
});

exports.default = openai;
module.exports = router;
