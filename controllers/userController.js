const Users = require("../models/profileUserSchema")
const bcrypt = require("bcrypt")
const  jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/utils");


const addNewUser = async (req, res) =>{
    try {
        const {userName, email, password, age, name, lastName, genre} = req.body
        const user = await new Users({
            userName: userName, 
            email: email, 
            password: await bcrypt.hash(password,10), 
            age: age, 
            name: name, 
            lastName: lastName, 
            genre: genre})
        user.save()
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "cannot create your user",
            error: error.message
        })
    }
};
const loginUser = async (req, res) =>{
    //En esta funcion nos logueamos, recordad que este codigo esta hecho aun sin los middlewares, una vez hechos se modifican para que todo gire en torno a ello.
    try {
        const  {email, password} = req.body;
        const data = await Users.findOne({email:email})
        if(data) {
            const validatePassword = await bcrypt.compare(password, data.password);
            if(validatePassword){
                const payload = {
                    userId: data._id,
                    email: data.email,
                    nombre : data.name,
                };
                console.log("login success")
                //Aqui debajo van los tokens, cuando hagamos los middlewares  de autenticacion actualizamos codigo.
                const token = generateToken(payload, false);
                const token_refresh = generateToken(payload, true);

                return res.status(200).json({
                    status: "success",
                    message: "Login successfully",
                    data: data,
                    token: token,
                    token_refresh: token_refresh
            })

        }else {
            return res.status(200).json({
                status: "error",
                message:"email and password don't match"
            })
        }
        }  
          
    } catch (error) {
        res.status(400).json({

            status: "error",

            message: "cannot login",
             error: error.message
        })
    }
};

const getAllUsers = async (req, res) =>{
    //Podriamos poner que solo puedan acceder a los Users los admins o los que tienen tokens

    try {
        const users = await Users.find({},{ 
            password: 0,
            role: 0,
            _id: 0
        })
        return res.status(200).json({
            status:"succes",
            data:users
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "cannot get the data requested"
        })
    }
}

const updateUserData = async (req, res) =>{
    try {
        const idUser = req.params.userId; //Una vez que tengamos el payload y los token hay que modificar el codigo para que el id se coja desde el token.
        const {
            name,
            lastName,
            email,
            genre,
            age
        } = req.body
        const userData = await Users.findByIdAndUpdate(idUser, {
            name,
            lastName,
            email,
            genre,
            age
        })
        res.status(200).json({
            status: "success",
            data: userData
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "cannot modify the user data"
        })
    }
}

const deleteUserById = (req, res) =>{c 

    //Eliminamos mediante el id del payload (Aun no lo tenemos), el usuario de la base de datos.
    try {
        const idUser = req.params.id
        const  deleteUser = Post.findByIdAndDelete(idUser);
        if(!deleteUser) return res.status(200).json({
            status: "success",
            message: "Cannot found your id"
        })
        return  res.status(200).json({
                status:'Success',
                data: deleteUser
             });  
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot delete your user",
            error: error.message
        })
    }
}

module.exports = {addNewUser, updateUserData, getAllUsers, loginUser, deleteUserById}