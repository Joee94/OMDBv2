import bcrypt from "bcrypt";
const saltRounds = 10;
import { writeFile, readFile } from "fs";

export const RegisterHandler = (req, res) => {
  const { firstName, username, password, nonce, cnonce } = req.body;

  readFile("./db.json", (err, data) => {
    if (err) {
      return;
    }
    const db = JSON.parse(data);

    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (db.users.find((user) => user.username === username)) {
        res.status(409).send({ message: "Username in use" })
      } else {
        const user = {
          firstName,
          username,
          password,
          nonce,
          cnonce,
          hash,
        };
        db.users.push(user);
        db.numberOfUsers = db.users.length + 1;
        writeFile("./db.json", JSON.stringify(db, null, 2), (err) => {
          if (err) {
            res.status(err.code).send({ message: err.message })
            return;
          }
          req.session.userid = req.body.username;
          res.status(200).send({ message: "Login successful" })
          return;
        });
      }
    });
  });
};
