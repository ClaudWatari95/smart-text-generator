import { Configuration } from "openai";
import { config } from 'dotenv';
import axios from "axios";
import helpers from '../helpers.js';
import authenticator from '../auth/verify-auth.js';

config();

const { saveChats } = helpers;
const { user } = authenticator;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const prompter = async (req, res) => {
  try {
    if (!configuration.apiKey) {
      return res.status(500).json({
        error: {
          message: "Invalid OpenAI API key",
        }
      });
    }
    const { chatId } = req.query;
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: {
          message: "Invalid prompt entered",
        }
      });
    }
    let data = await axios({
      method: 'post',
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${configuration.apiKey}`
      },
      data: {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
      }
    });
    saveChats(prompt, data.data.choices[0].message.content, user.email, chatId);
    // saveChats(prompt, 'Generic response for testing', user.email, chatId);

    res.status(200).json({
      result: data.data.choices[0].message.content
      // result:  'Generic response for testing'
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "An error occured",
        error: error.message
      }
    });
  }
};


export default prompter;