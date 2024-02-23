export default function Logout(req, res) {
  console.log("logout");
  req.session.destroy();
  res.redirect("/");
}
