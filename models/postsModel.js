const mongoose = require("mongoose");
const { type } = require("os");

const commentsModel = new mongoose.Schema({ //Comentarios que va a recibir de otros usuarios la foto.
    usuario: {type: mongoose.Schema.Types.ObjectId, require: true},
    content: {type: String},
    date: {type: Date, default: Date.now}
})


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
    userPoster:{
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Users",
        required: true
    },
    comments:[commentsModel],
    date:{
        type: Date,  
        default: Date.now(),
        require: true
    },
    favourites:[{// Recuento de favoritos que tenga la foto.
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users", 
    }]
})

const Post = mongoose.model("Products", postSchema)

module.exports = Post;