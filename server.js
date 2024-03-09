//e.g server.js
import express from "express";
import ViteExpress from "vite-express";

import sessions from "express-session";
import {
  RegisterHandler,
  NonceHandler,
  LogoutHandler,
  LoginHandler,
  UserInfoHandler,
} from "./handlers/index.js";

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
app.post("/register", RegisterHandler);
app.get("/logout", LogoutHandler);
app.get("/nonce", NonceHandler);
app.get("/user-info", UserInfoHandler);

ViteExpress.listen(app, 3000, () => console.log("Server is listening at http://localhost:3000"));
