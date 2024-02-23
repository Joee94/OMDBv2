import bcrypt from "bcrypt";
const saltRounds = 10;

export default function LoginHandler(req, res) {
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      // console.log("Salt: ", salt);
      return bcrypt.hash(req.body.password, salt);
    })
    .then((hash) => {
      // console.log("Hash: ", hash);
      req.session.userid = req.body.username;
    })
    .catch((err) => console.error(err.message))
    .finally(() => {
      res.redirect("/");
    });
}
