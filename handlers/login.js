export default function LoginHandler(req, res) {
  console.log("login handler");
  console.log(req.session);
  if (req.session.userid) {
    return res.send(JSON.stringify({ user: req.session.userid, valid: true }));
  }

  res.send(JSON.stringify({ user: null, valid: false }));

  res.end();
}
