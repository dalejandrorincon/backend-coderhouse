const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on("UPDATE_PRODUCTS", (products) => {
  const url = "http://localhost:3000/views/partials/tablaProductos.hbs";
  fetch(url).then((resp) => {
    return resp.text();
  }).then((text) => {
    const template = Handlebars.compile(text);
    const html = template({ products });
    document.querySelector("#products").innerHTML = html;
  });
});
socket.on("NEW_MESSAGE", (msg) => {
  appendMessage(msg);
});
socket.on("UPDATE_MESSAGES", (allMessages) => {
  if(allMessages.length > 0){
    document.getElementById("posts").innerHTML = "";
    allMessages
      .sort((a, b) => a.date - b.date)
      .forEach(msg => appendMessage(msg));
  }else{
    document.getElementById("posts").innerHTML += `<h3 class="text-center">No hay mensajes en el chat</h3>`;
  }
});
function appendMessage(msg) {
  const newDate = new Date(msg.date).toLocaleString();
  document.getElementById("posts").innerHTML += `
  <div class="post">
      <span class="text-primary">${msg.email}</span> 
      <span class="text-danger">[${newDate}]</span>: <span class="text-success">${msg.mensaje}</span>
  </div>
  `;
}
function enviarMensaje() {
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("message").value;
    socket.emit("POST_MESSAGE", {
      email,
      mensaje
    });
}
