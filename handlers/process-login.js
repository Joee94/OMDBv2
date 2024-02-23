export default function ProcessLoginHandler(req, res) {
  console.log("process login");
  console.log(req.body);
  req.session.userid = req.body.username;

  res.redirect("/");
}
