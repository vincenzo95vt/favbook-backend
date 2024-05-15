const mongoose = require("mongoose")

const profileUserSchema =  new mongoose.Schema({
    userName: {// Nombre de usuario que el usuairo quiera ponerse.
        type: String,
        require: true
    },
    imgProfile:{
        type: String,
        require: true,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    email:{ //Email necesario para hacer login.
        type: String,
        require: true,
        unique: true
    },
    password:{ //Contraseña que vaya a poner
        type: String,
        require: true
    },
    description:{ //Descripcion de perfil de usuario
        type: String,
        require: true,
        default: ""
    },
    age:{ // Edad que tiene el usuario 
        type: Number,
        require: true
    },
    name: { //Nombre real de usuario
        type: String,
        require: true
    },
    lastName:{ //Apellidos del mimso
        type: String,
        require: true
    },
    followers:[{ //Recuento de seguidores
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true,
    }],
    following:[{// Recuento de seguidos
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true,
    }],
    genre:{//Genero que sea, si hombre o mujer.
        type: String,
        enum: ["Hombre", "Mujer"],
        require: true
    },
    role:{ //Rol que es, pro defecto va a ser user.
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    privacy:{ //Privacidad de la cuenta.
        type: String,
        require: true,
        enum: ["private", "public"],
        default: "public"
    },
    myLists: [ //Listas del usuario
        {
            name: { //Nombre de la lista
                type: String,
                required: true,
            },
            description: { //Descripcion de la lista
                type: String,
                required: true,
            },
            favouritePosts: { //Productos favoritos del usuario
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        }
    ]
})

const Users = mongoose.model("Users", profileUserSchema) 

module.exports = Users; //Exportamos modelo.