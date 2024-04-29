//creacion de la firma de nuesto token
// Se importa el módulo crypto de Node.js
const crypton = require("crypto");

// Se define una cadena llamada secret que se utilizará como la clave secreta para generar el hash HMAC
const secret = "favbook refresh";

// Se crea el hash HMAC utilizando la clave secreta y el algoritmo SHA-256.
// Se utiliza createHmac para crear un objeto Hmac que se puede usar para generar el hash.
// Se pasa el algoritmo "sha256" y la clave secreta al método createHmac.
// Luego, se llama a update para proporcionar los datos que se usarán para calcular el hash.
// Finalmente, digest se utiliza para calcular el hash y obtenerlo en formato hexadecimal.
const hash = crypton.createHmac("sha256", secret)
    .update("soy otro campo secreto refresh")
    .digest("hex");

// Se imprime el hash generado en la consola.
console.log(hash);
