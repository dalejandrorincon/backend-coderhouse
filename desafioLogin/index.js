const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const auth = require("./middleware");
const handlebars = require("express-handlebars");

const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/",
  partialsDir: __dirname + "/views/partials/"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views/pages");

const session = require('express-session');

// const MongoStore = require('connect-mongo');
app.use(session({
  // store: new MongoStore({
  //     mongoUrl: 'mongodb+srv://DiegoRincon:qRjCYM2SzzYll7ke@cluster0.o8xmg3v.mongodb.net/?retryWrites=true&w=majority',
  //     ttl: 60 * 60 * 24 * 7,
  //     retries: 0
  // }),
  secret: "STRING_SECRET",
  saveUninitialized: true,
  resave: false,
}));

const usersWithPasswords = [
  { username: 'user1', password: 'password1', address: 'address1' },
  { username: 'user2', password: 'password2', address: 'address2' },
  { username: 'user3', password: 'password3', address: 'address3' },
];

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

app.get("/profile", auth, (req, res) => { // Ruta privada
  if (!req.session.contador) {
    req.session.contador = 1;
  } else {
    req.session.contador++;
  }
  res.render("profile", {user: req.session.user, contador: req.session.contador});
});

app.post("/login", (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  const user = usersWithPasswords.find((user) => user.username === username);
  if (!user || user.password !== password ) {
    res.status(404).send({ // Not found
      message: "Invalid username or password",
    });
    return ;
  }
  req.session.user = user;
  res.redirect("/profile");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  // Verificar que el usuario no exista
  const user = usersWithPasswords.find((user) => user.username === username);
  if (user) { // Guard clause
    res.status(400).send("User already exists"); // Status 400: Bad Request
    return ; // undefined
  }
  usersWithPasswords.push({username, password, email});
  //console.log(usersWithPasswords);
  // res.send({
  //   message: "User created successfully",
  //   user: {username, email},
  // });
  res.redirect('/login');
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡ Server listening :: http://localhost:${PORT}`);
});