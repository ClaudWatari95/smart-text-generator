
import helpers from '../helpers.js';
import authenticator from '../auth/verify-auth.js';

const { findObject } = helpers;
const { user } = authenticator;
const getChats = (req, res) => {
  try {
    const existingChats = findObject('chat', 'utf8', false, user.email, null, 'byInstance');
    if(!existingChats) {
      return res.status(400).json({
        error: {
          message: "No chats available",
        }
      });
    }
    const titles = [];
    existingChats.forEach(chat => {
      titles.push(chat.title);
    });
    res.status(200).json({
      titles
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

const getChat = (req, res) => {
  try {
    const { chatId } = req.params;
    const existingChat = findObject('chat', 'utf8', false, user.email, chatId, 'byInstance');
    if(!existingChat) {
      return res.status(400).json({
        error: {
          message: "Invalid chat id",
        }
      });
    }
    res.status(200).json({
      existingChat
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

export default {
  getChats,
  getChat
};