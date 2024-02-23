//e.g server.js
import express from "express";
import ViteExpress from "vite-express";

import sessions from "express-session";
import LoginHandler from "./handlers/login.js";
import ProcessLoginHandler from "./handlers/process-login.js";
import LogoutHandler from "./handlers/logout.js";

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
app.get("/login", LoginHandler);
app.post("/process-login", ProcessLoginHandler);
app.get("/logout", LogoutHandler);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
