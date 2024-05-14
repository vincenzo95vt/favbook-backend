
const { error } = require("console")
// Con esta configuración, el servidor permitirá todas las solicitudes desde cualquier origen
const cors = require('cors');
//Instalamos express para trabajar en el back
const express = require("express")
//Llamamos a cors
const cors = require("cors")
//Definimos nuestro puerto en Localhost
const PORT = 4000
//importacion de la libreria de swagger una, una para la parte visual y la otra la parte de interfaz
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

//Instalamos mongoose para conectar a mongoDB
const mongoose = require("mongoose")
//Definimos constante app para levantar servidor con  express
const app = express()
app.use(express.json())
app.use(cors())
//Instalamos dotenv para guardar claves como Tokens, Secret tokens y Url de mongodb con su contraseña
require("dotenv").config()
//Declaramos el cors, para conectar el back con el front:
app.use(cors())

//Definimos la url de mongo llamando a .env en una constante
const urlMongodb = process.env.MONGO_URL_PSWD

const postRouters = require("./routers/postRouters")
const userRouters = require("./routers/userRouters")
//Conectaqmos con mongoose a la url que hemos definido antes
mongoose.connect(urlMongodb)
//Guardamos en una constante db la conexion.
const db = mongoose.connection;

//Y hacemos control de errores si se conecta o no
//Si no se conecta, lanzamos error:
db.on("error", (error) => {
    console.error("Error al conectar")
})

//Si se conecta, lanzamos conexion establecida con db.once puesto que solo se va a ver una vez si la conexion esta hecha.
db.once("connected", () => {
    console.log("Connection success")
})

//Si se ha desconectado lanzamos otro db.on con otro error.
db.on("disconnected", (error) => {
    console.error("mongoose default conection is disconnected")
})

app.use("/user", userRouters)
app.use("/posts", postRouters)
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//Aqui lanzamos un app.listen para definir nuestra url para seguir el link desde la consola.
app.listen(PORT, () => {
        console.log(`Server running in http://localhost:${PORT}`)
})

