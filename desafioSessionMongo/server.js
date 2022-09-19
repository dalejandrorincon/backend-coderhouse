import 'dotenv/config'
import express from 'express';
import routerProducto from './src/routes/routes.js';
import { Server as http } from 'http'
import { Server as ioServer } from 'socket.io'
import { saveMsjs, getMsjs } from './src/controllers/mensajes.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/public", express.static('./public/'));

app.use(cookieParser());
app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://DiegoRincon:qRjCYM2SzzYll7ke@cluster0.o8xmg3v.mongodb.net/?retryWrites=true&w=majority',
        ttl: 60 * 60 * 24 * 7,
        retries: 0
    }),
    secret: "STRING_SECRET",
    resave: false,
    saveUninitialized: true
}));

const httpserver = http(app)
const io = new ioServer(httpserver)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', routerProducto);

/* -------------------------------- webSocket ------------------------------- */
io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    socket.on('enviarMensaje', (msj) => {
        saveMsjs(msj);
    })

    socket.emit('mensajes', await getMsjs());
})

/* ------------------------ Render condicional LOGIN ------------------------ */
app.get('/', (req, res) => {
    try {
        if (req.session.user) {
            res.sendFile(__dirname + '/views/index.html');
        } else {
            res.sendFile(__dirname + '/views/login.html');
        }
    } catch (err) {
        console.log(err);
    }
})
/* --------------------------- userName en session -------------------------- */
app.post('/setUserName', (req, res) => {
    req.session.user = req.body.user;
    process.env.USER = req.body.user;
    res.redirect('/');
})
/* -------------------------- userName en session -------------------------- */
app.get('/getUserName', (req, res) => {
    try {
        if (req.session.user) {
            const user = process.env.USER;
            res.send({
                user
            })
        } else {
            res.send({
                userName: 'no existe'
            })
        }
    } catch (err) {
        console.log(err);
    }
})
/* ------------------ Nombre de usuario por env ------------------ */
app.get('/getUserNameEnv', (req, res) => {
    const user = process.env.USER;
    res.send({
        user
    })
})

app.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/logout');
            }
        })
    } catch (err) {
        console.log(err);
    }
})

app.get('/logoutMsj', (req, res) => {
    try {
        res.sendFile(__dirname + '/views/logout.html');
    }
    catch (err) {
        console.log(err);
    }
})



const PORT = process.env.PORT || 8080;

const server = httpserver.listen(PORT, () => {
    console.log(`Server is running on port: ${server.address().port}`);
});
server.on('error', error => console.log(`error running server: ${error}`));

