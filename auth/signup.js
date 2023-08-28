import bcrypt from 'bcrypt';
import fs from 'fs'; // using json file as database to persist data ie. user authentication
import helpers from '../helpers.js';

const { signToken, findObject, createFile } = helpers;
const signup = (req, res) => {
  try {
    const fileName = 'users.json';
    const { email, fullname, password } = req.body;
    if (!email || !fullname || !password)  {
      return res.status(400).json({
        error: {
          message: "Missing data, all fields required",
        }
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = {
      email, fullname, password: hashedPassword
    };
    createFile(fileName);
    const existingUser = findObject('user', 'utf8', false, email, null, 'byInstance');
    if(existingUser) {
        return res.status(400).json({
          error: {
            message: "Email already exists, maybe log in",
          }
        });
    }
    const users = findObject('user', 'utf8', true, email, null, 'byInstance');
    // add new user to database file
    fs.writeFileSync('users.json', JSON.stringify([...users, newUser], null, 2));

    const token = signToken(email);
    res.status(201).json({
      success: {
        message: "Added successfully",
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


export default signup;