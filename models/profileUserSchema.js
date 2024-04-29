const mongoose = require("mongoose")

const profileUserSchema =  new mongoose.Schema({
    userName: {// Nombre de usuario que el usuairo quiera ponerse.
        type: String,
        require: true
    },
    email:{ //Email necesario para hacer login.
        type: String,
        require: true
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
        type: [String],
        enum: ["Hombre", "Mujer"],
        require: true
    },
    role:{ //Rol que es, pro defecto va a ser user.
        type:[String],
        enum: ["admin", "user"],
        default: "user"
    }
})

const ProfileUser = mongoose.model("Users", profileUserSchema) 

module.exports = ProfileUser; //Exportamos modelo.