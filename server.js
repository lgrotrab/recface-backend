const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const db = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const register = require("./controller/register");
const signin = require("./controller/signin");
const profileUpdate = require("./controller/profileUpdate");
const profile = require("./controller/profile");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("i'm working");
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/profile", (req, res) => {
  profileUpdate.handleProfileUpdate(req, res, db);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

app.post("/imageurl", (req, res) => {
  profileUpdate.handleImageUrl(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
