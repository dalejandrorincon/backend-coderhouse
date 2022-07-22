/* ------------------------ Definición paquetes ----------------------- */
const express = require('express');
const routerProducto = require("./routes/productos")
/* ---------------------------- Crea app express --------------------------- */
const app = express();

/* ------------------------- Para poder recibir JSON ------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------------------ Carga del index ------------------------------ */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.use("/api/productos", routerProducto);

/* ------------------- Configuracion de archivos estaticos ------------------ */
app.use(express.static("public"));

/* ----------------------- Levantamiento del servidor ----------------------- */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server escuchando ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`))