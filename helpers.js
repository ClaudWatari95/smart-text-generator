import jwt from 'jsonwebtoken';
import fs from 'fs';
import { config } from 'dotenv';
config();

const signToken = (email) => {
  return jwt.sign(
    {email}, process.env.SECRET_KEY,
    // no expiry token, if you want to set an expiry, uncomment below and change the duration if you want
    // { expiresIn: '4h'}
  );
}

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
}

// a function to find either users or chats. 'type' can only be 'user' or 'chat'
const findObject = (type, encoding, raw, email, chatId, findMethod) => {
  const object = JSON.parse(fs.readFileSync(`${type}s.json`, encoding));
  if(raw) {
    return object; // return the entire instance initially
  }
  if(type === 'user') {
    let existingUser = null;
    if(findMethod === 'byInstance') {
      existingUser = object.find((user) => user.email === email); // return specific element from instance
    } else if(findMethod === 'byIndex') {
      existingUser = object.findIndex((user) => user.email === email); // return specific element from instance
    }
    return existingUser;
  } else if(type === 'chat') {
    let existingChat = null;
    if(chatId && chatId !== '') {
      if(findMethod === 'byInstance') {
        existingChat = object.find((chat) => chat.title === chatId);
      } else if(findMethod === 'byIndex') {
        existingChat = object.findIndex((chat) => chat.title === chatId);
      }
      return existingChat;
    }
    const allChats = object.filter((chat) => chat.user === email);
    return allChats;
  } else {
    return 'Invalid object type passed';
  }
}

const createFile = (fileName) => {
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, '[]'); // create empty list to simulate a table
  }
}

const saveChats = (prompt, response, user, chatId) => {
  const existingUser = findObject('user', 'utf8', false, user, null, 'byInstance');
  if(!existingUser) return false;
  createFile('chats.json');
  const chats = findObject('chat', 'utf8', true, null, null, null);
  const existingChatIndex = findObject('chat', 'utf8', false, user, chatId, 'byIndex');
  const chatTitle = prompt.length > 22 ? `${prompt.slice(0, 22)}...` : prompt;
  if(chats.length > 0 && existingChatIndex > -1) { // if chat exists already, just update the content
    chats[existingChatIndex].content.push({prompt}, {response});
    fs.writeFileSync('chats.json', JSON.stringify(chats, null, 2));
  } else { // otherwise create new chat item
    const newChat = {
      title: chatTitle,
      content: [{prompt}, {response}],
      user: user
    };
    fs.writeFileSync('chats.json', JSON.stringify([...chats, newChat], null, 2));
  }
  return true;
};

export default {
  signToken: signToken,
  verifyToken: verifyToken,
  findObject: findObject,
  createFile: createFile,
  saveChats: saveChats
};