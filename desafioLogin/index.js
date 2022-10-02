require("dotenv").config();
const express = require('express');

const auth = require("./middleware");
const handlebars = require("express-handlebars");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./user.schema");
const { connect } = require('./database');
const { isValidPassword, hashPassword } = require("./utils");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const argv = require('minimist')(process.argv.slice(2));
const { fork } = require('child_process');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

connect();
app.use(cookieParser());
app.use(session({
  store: new MongoStore({
    mongoUrl: `mongodb+srv://DiegoRincon:${process.env.MONGOPASS}@cluster0.o8xmg3v.mongodb.net/plataforma?retryWrites=true&w=majority`,
    ttl: 60 * 60 * 24 * 7,
    retries: 0
  }),
  secret: process.env.SECRETSTRING,
  cookie: {
    expires: 10 * 60 * 1000 //Expiración de sesión luego de 10 minutos
  },
  saveUninitialized: false,
  resave: true,
  rolling: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use("login", new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        console.log(`User not found with userName ${username}`);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid password");
        return done(null, false);
      }

      return done(null, user);
    });

  }));


passport.use("signup", new LocalStrategy({
  passReqToCallback: true
},
  async (req, username, password, done) => {
    const user = await User.findOne({ username: username });
    if (user) {
      return done(new Error("User already exists."), null);
    }
    const userEmail = req.body.email;
    const hasehdPassword = hashPassword(password);
    const newUser = new User({
      username,
      password: hasehdPassword,
      email: userEmail
    });
    await newUser.save();
    return done(null, newUser);
  }));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/",
  partialsDir: __dirname + "/views/partials/"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views/pages");

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get('/api/randoms', function (req, res) {
  const query = req.query.cant;
  console.log("Running main.js");
  console.log("Forking a new subprocess....");
  
  const child = fork('./child.js')
  child.send(query);
  child.on("message", (msg) => {
    res.json(msg);
  })

})
app.get("/info", (req, res) => {
  const args = process.argv.slice(2);
  const _args = {
    'Arguementos de entrada': args,
    'Directorio actual del proceso': process.cwd(),
    'ID del proceso': process.pid,
    'Versión de Node': process.version,
    'Titulo del proceso': process.title,
    'Sistema operativo': process.platform,
    'Uso de memoria': process.memoryUsage()
  }
  res.json(_args);
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

app.get('/home', auth, (req, res) => {
  res.render("home", { user: req.session.user, contador: req.session.contador });
});

app.post("/login", passport.authenticate("login", {
  failureRedirect: "/login",
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/home');
});

app.post("/signup", passport.authenticate("signup", {
  failureRedirect: "/signup",
}), (req, res) => {
  req.session.user = req.user;
  res.redirect("/login");
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
const PORT = argv.p || 8080;
app.listen(PORT, () => {
  console.log(`⚡ Server listening :: http://localhost:${PORT}`);
});