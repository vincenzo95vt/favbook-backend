const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    post:{ //Aqui vamos a almacenar la URL de la imagen, no se almacena directamente en mongo, sino que se almacena solo la URL donde esa imagen esta alojada.
        type: String,
        require: true
    },
    postName:{ //Nombre del producto que vamos a poner cada vez que subamos una imagen.
        type: String,
        require: true
    },
    description: { //Descripcion del producto que queramos subir
        type: String,
        require: true,
        default: ""
    },
    comments:{//Comentarios que va a recibir de otros usuarios la foto.
        type: String,
        require: false, //Hay que preguntar si es false o true, porque los comentarios los ponen los demas usuarios, y por defecto no habrá.
    },
    favourites:{// Recuento de favoritos que tenga la foto.
        type: Number,
        require: false, // Lo mismo que en comentarios...
        default: 0
    }
})

const Post = mongoose.model("Products", postSchema)

module.exports = Post;