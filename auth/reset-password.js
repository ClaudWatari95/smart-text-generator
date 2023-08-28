import bcrypt from 'bcrypt';
import fs from 'fs'; // using json file as database to persist data ie. user authentication
import { config } from 'dotenv';
import helpers from '../helpers.js';
config();

const { findObject } = helpers;
const resetPassword = (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        error: {
          message: "Missing data, all fields required",
        }
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: {
          message: "Passwords do not match",
        }
      });
    }
    if (!fs.existsSync('db.json')) {
      fs.writeFileSync('db.json', '[]'); // create empty user list to simulate a table
    }
    const users = findObject('user', 'utf8', true, null, null, null);
    const existingUserIndex = findObject('user', 'utf8', false, email, null, 'byIndex');
    if(existingUserIndex === -1) {
        return res.status(400).json({
          error: {
            message: "No account found, maybe sign up",
          }
        });
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    users[existingUserIndex].password = hashedPassword;
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.status(200).json({
      success: {
        message: "Updated successfully",
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


export default resetPassword;