export default function ProcessLoginHandler(req, res) {
  console.log("process login");
  if (req.body.username !== "admin" || req.body.password !== "admin") {
    return res.send("Invalid username or password");
  }

  req.session.userid = req.body.username;

  res.redirect("/");
}
