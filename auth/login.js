import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import helpers from '../helpers.js';
config();

const { signToken, findObject, createFile } = helpers;
const login = (req, res) => {
  try {
    const fileName = 'users.json';
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: "Missing data, all fields required",
        }
      });
    }
    createFile(fileName);
    const existingUser = findObject('user', 'utf8', false, email, null, 'byInstance');
    if(!existingUser) {
      return res.status(400).json({
        error: {
          message: "No account found, maybe sign up",
        }
      });
    }
    const hashedPassword = bcrypt.compareSync(password, existingUser.password);
    if(!hashedPassword) {
      return res.status(400).json({
        error: {
          message: "Incorrect password",
        }
      });
    }
    const token = signToken(email);
    res.status(200).json({
      success: {
        message: "Authenticated successfully",
        token
      }
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


export default login;