export default function Logout(req, res) {
  console.log(req.session);
  console.log("logout");
  req.session.destroy();
  res.redirect("/");
}
