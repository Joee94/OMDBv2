export default function UserInfoHandler(req, res) {
  if (req.session.userid) {
    return res.send(JSON.stringify({ user: req.session.userid, valid: true }));
  }

  res.send(JSON.stringify({ user: null, valid: false }));

  res.end();
}
