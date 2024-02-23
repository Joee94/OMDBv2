import bcrypt from "bcrypt";
const saltRounds = 10;
import { writeFile, readFile } from "fs";

export default function LoginHandler(req, res) {
  const { username, password, nonce, cnonce } = req.body;
  // console.log(req.body);

  readFile("./db.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const db = JSON.parse(data);

    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (db.users.find((user) => user.username === username)) {
        bcrypt.compare(password, hash, function (err, result) {
          if (result && !err) {
            req.session.userid = req.body.username;
            console.log("Login successful");
            res.redirect("/");
          } else {
            console.log("Login failed", err);
          }
        });
      } else {
        const user = {
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
            console.log("An error has occurred ", err);
            return;
          }
          console.log("Data written successfully to disk");
          req.session.userid = req.body.username;
          res.redirect("/");
        });
      }
    });
  });
}
