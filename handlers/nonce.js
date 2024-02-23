import crypto from "crypto";

export default function NonceHandler(req, res) {
  res.send(
    JSON.stringify({ nonce: crypto.getRandomValues(new Uint8Array(16)) })
  );
}
