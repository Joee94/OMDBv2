import { writeFile, readFile } from "fs";

export const UserInfoHandler = (req, res) => {
  if (req.session.userid) {
    readFile("./db.json", (err, data) => {
      if (err) {
        return;
      }
      const db = JSON.parse(data);

      const found = db.users.find(
        (user) => user.username === req.session.userid
      );
      if (found) {
        res.status(200).send(JSON.stringify({ user: found, valid: true }));
        return;
      } else {
        res.status(404).send(JSON.stringify({ user: null, valid: false }));
        return;
      }
    });
  } else {
    res.status(401).send(JSON.stringify({ user: null, valid: false }));
    return;
  }
};
