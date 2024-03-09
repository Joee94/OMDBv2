import bcrypt from "bcrypt";
const saltRounds = 10;
import { readFile } from "fs";

export const LoginHandler = (req, res, next) => {
  const { username, password, nonce, cnonce } = req.body;

  readFile("./db.json", (err, data) => {
    if (err) {
      res.status(err.code).send({ message: err.message })
      return;
    }
    const db = JSON.parse(data);

    const user = db.users.find((user) => user.username === username);
    if (user) {
      bcrypt.compare(password, user.hash, function (err, result) {
        if (result && !err) {
          req.session.userid = username;
          res.status(200).send({ message: "Login successful" })
          return;
        } else {
          res.status(401).send({ message: "Incorrect password" })
          return;
        }
      });
    } else {
      res.status(404).send({ message: "User does not exist" })
    }
  });
};
