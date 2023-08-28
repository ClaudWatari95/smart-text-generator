import express from 'express';
import prompter from '../chat/prompt.js';
import signup from '../auth/signup.js';
import login from '../auth/login.js';
import resetPassword from '../auth/reset-password.js';
import authenticator from '../auth/verify-auth.js';
import getChatsObj from '../chat/get-chats.js';

const router = express.Router();
const { verifyAuth } = authenticator;
const { getChat, getChats } = getChatsObj;

// define routes and callbacks

// backend route endpoints
router.post('/chat', verifyAuth, prompter);
router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password', resetPassword);

router.get('/chat.api', verifyAuth); // all other endpoints using verifyAuth use call-next header except for this one

router.get('/user-chats', verifyAuth, getChats);
router.get('/user-chats/:chatId', verifyAuth, getChat);

// web client route endpoints to render html
router.get('/chat', (req, res) => {
  res.render('main', {layout : 'index'});
});
router.get('/login', (req, res) => {
  res.render('main', {layout : 'index', noSession: true, login: true});
});
router.get('/signup', (req, res) => {
  res.render('main', {layout : 'index', noSession: true, signup: true});
});
router.get('/reset-password', (req, res) => {
  res.render('main', {layout : 'index', noSession: true, resetPassword: true});
});

router.use('/', (req, res) => {
  res.send(`
    <p>404: Resource not found</p>
    <a href = '/chat'>Go to home</a>
  `);
});

export default router;