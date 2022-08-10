/* -------------------------- Definición módulo fs -------------------------- */
const fs = require("fs");
/* --------------------------- Lectura del archivo -------------------------- */
const data = fs.readFileSync('./files/productos.json', 'utf-8');
/* ------------------------- Parseado del contenido ------------------------- */
const products = JSON.parse(data);


/* ------------------------ Destructuración del array ----------------------- */
//const { id } = products;
// console.log(products[0].id);

/* ----------------------- Definición clase contenedor ---------------------- */
class Contenedor {
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = 1;
  }
  static arrayIds = [];
  save() {
    //Se analiza el tamaño del array que se encuentra en el archivo productos, para validar si está vacio.
    if (products.length == 0) {
      //En caso de estar vacio el array, se agrega el primer elemento al archivo productos.
      products.push({
        title: this.title,
        price: this.price,
        thumbnail: this.thumbnail,
        id: this.id
      });
      fs.writeFileSync('./files/productos.json', JSON.stringify(products, null, 2));
    } else {
      // Se recorre todo el array de productos, y se agregan los ids al arreglo arrayIds
      for (const producto in products) {
        Contenedor.arrayIds.push(products[producto].id);
      }
      // Se identifica el id mayor
      let idMax = Math.max(...Contenedor.arrayIds);
      // Se reasigna el id del elemento, al idMax + 1 
      this.id = idMax + 1;

      // Se agrega el producto nuevo con el id modificado 
      products.push({
        title: this.title,
        price: this.price,
        thumbnail: this.thumbnail,
        id: this.id
      });
      //Se sobreescribe el archivo productos
      fs.writeFileSync('./files/productos.json', JSON.stringify(products, null, 2));

    }
  }
  getById(id) {

    const producto = products.filter((product) => product.id === id);
    // Operador ternario que muestra el producto y en caso no existir el id, muestra mensaje de "error"
    producto.length === 0 ? console.log("No existen productos por el id suministrado") : console.log(producto);
  }
  getAll() {
    console.log(products);
  }
  deleteById(id) {
    //La función recibe el id, filtra el array excluyendo el id recibido
    const newProducts = products.filter((product) => product.id !== id);

    //Se sobreescribe el archivo productos con el array obtenido
    fs.writeFileSync('./files/productos.json', JSON.stringify(newProducts, null, 2));
  }
  deleteAll() {
    const emptyArray = [];
    //Se sobreescribe el archivo productos con el array vacio
    fs.writeFileSync('./files/productos.json', JSON.stringify(emptyArray));
  }
}
/* --------------------------- Creación de objetos -------------------------- */
const producto1 = new Contenedor("Camiseta Titular Lecoqsportif Argentina 1986 - 10 Maradona", 2000, "http://placekitten.com/g/200/300");
const producto2 = new Contenedor("Camiseta Gimnasia Le Coq Sportif 2019 Blanca Maradona", 2500, "http://placekitten.com/g/200/301");

/* ------------------------------- Metodo save ------------------------------ */
//producto1.save();
//producto2.save();

/* ----------------------------- Método getById ----------------------------- */
//producto1.getById(5);
//producto2.getById(2);
/* ------------------------------ Método getAll ----------------------------- */
//producto1.getAll();
/* ---------------------------- Método deleteById --------------------------- */
//producto1.deleteById(5);
//producto1.deleteById(2);
/* ---------------------------- Método deleteAll ---------------------------- */
//producto1.deleteAll();