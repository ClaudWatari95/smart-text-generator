import helpers from '../helpers.js';

const { verifyToken, findObject } = helpers;
const user = {
  email: ''
};

const verifyAuth = (req, res, next) => { 
  const token = req.headers['authorization'];
  const callNext = req.headers['call-next'];
  if(!token) {
    return res.status(400).json({
      error: {
        message: "Invalid token",
      }
    });
  }
  try {
    const payload = verifyToken(token, process.env.secret_key);
    const existingUser = findObject('user', 'utf8', false, payload.email, null, 'byInstance');
    if(!existingUser) {
      return res.status(400).json({
        error: {
          message: "No account found, maybe sign up",
        }
      });
    }
    if(callNext) {
      user.email = payload.email;
      return next(); // if call-next header passed as true, call next middlware, important for routes.post > /chat
    } else {
      return res.status(200).json({
        success: {
        message: "200",
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: {
        message: "Authentication error",
      }
    });
  }
};

export default {
  verifyAuth,
  user
};