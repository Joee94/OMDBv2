//e.g server.js
import express from "express";
import ViteExpress from "vite-express";

import sessions from "express-session";
import UserInfoHandler from "./handlers/userInfo.js";
import LoginHandler from "./handlers/login.js";
import LogoutHandler from "./handlers/logout.js";
import NonceHandler from "./handlers/nonce.js";

const app = express();

app.use(
  sessions({
    secret: "some secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/login", LoginHandler);
app.get("/logout", LogoutHandler);
app.get("/nonce", NonceHandler);
app.get("/user-info", UserInfoHandler);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
