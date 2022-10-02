
function calcular(query) {
  const objNumbers = {};
  for (let i = 1; i <= query; i++) {
    let propOwn = Object.getOwnPropertyNames(objNumbers);
    const randomNum = Math.floor(Math.random() * (11 - 1) + 1);
    if(propOwn.length > 0){
      if(objNumbers.hasOwnProperty(randomNum)){
        objNumbers[randomNum] += 1;
      }else{
        objNumbers[randomNum] = 1;
      }
      
    }else{
      objNumbers[randomNum] = 1;
    }
  }
  return objNumbers
}
process.on("message", (msg) => {
  console.log(`Message from main.js: ${msg}`);
  const resultado = calcular(msg);
  console.log(resultado);
  process.send(resultado);
});

