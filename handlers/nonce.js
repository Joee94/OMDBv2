import crypto from "crypto";

export const NonceHandler = (req, res) => {
  res.send(
    JSON.stringify({ nonce: crypto.getRandomValues(new Uint8Array(16)) })
  );
};
