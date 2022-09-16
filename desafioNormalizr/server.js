import express from 'express';
import routerProducto from './src/routes/routes.js';
import { Server as http } from 'http'
import { Server as ioServer } from 'socket.io'
import { saveMsjs, getMsjs } from './src/controllers/mensajes.js';

const app = express();
const httpserver = http(app)
const io = new ioServer(httpserver)

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', routerProducto);

io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    socket.on('enviarMensaje', (msj) => {
        saveMsjs(msj);
    })

    socket.emit ('mensajes', await getMsjs());
})

const PORT = process.env.PORT || 8080;

const server = httpserver.listen(PORT, () => {
    console.log(`Server is running on port: ${server.address().port}`);
});
server.on('error', error => console.log(`error running server: ${error}`));

