const Users = require("../models/profileUserSchema")
const bcrypt = require("bcrypt")
const  jwt = require("jsonwebtoken");
const { generateToken, userExist } = require("../utils/utils");
const { response } = require("express");
const { error } = require("console");



const addNewUser = async (req, res) =>{
    try {
        const {userName, email, password, description, age, name, lastName, genre} = req.body
        const user = await new Users({
            userName: userName, 
            email: email, 
            password: await bcrypt.hash(password,10), 
            description: description,
            age: age, 
            name: name, 
            lastName: lastName, 
            genre: genre})
        //En esta funcion vamos a comprobar si el usuario existe en la base de datos desde el back para mandar un mensaje al front por si esta o no. 
        if( await userExist(user.email)) return res.status(409).json({
            message: "The email is already in use",
            status: "error"
        })
        user.save()
        res.status(201).json({
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
                    name : data.name,
                    lastName: data.lastName,
                    userName: data.userName,
                    description: data.description,
                    age: data.age,
                    imgProfile: data.imgProfile,
                    privacy: data.privacy
                };
                //Aqui debajo van los tokens, cuando hagamos los middlewares  de autenticacion actualizamos codigo.
                const token = generateToken(payload, false);
                const token_refresh = generateToken(payload, true);
                return res.status(200).json({
                    status: "success",
                    message: "Login successfully",
                    data: payload,
                    token: token,
                    token_refresh: token_refresh
            })
            
        }else {

            return res.status(401).json({
                status: "unauthorize",
                message:"email and password don't match"
            })
        }
        }  
          
    } catch (error) {
        res.status(401).json({

            status: "error",

            message: "cannot login",
             error: error.message
        })
    }
};

const getUserDetails = async (req, res) =>{
    try {
        const userId = req.payload.userId
        const data = await Users.findById(userId)
        if(!data) return res.status(400).send("No data to show")
        return res.status(200).json({
            status: "success",
            data: data
            })
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "cannot get the data requested"
        })
    }
}

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
        const idUser = req.payload.userId; 
        if(!idUser) return res.status(404).json({
            status:'error',
            message:'No users with that id'
        })
        const {
            imgProfile,
            name,
            lastName,
            userName,
            description,
            genre,
            age,
            privacy,
            myLists
        } = req.body
        
        const userData = await Users.findByIdAndUpdate(idUser, {
            imgProfile:imgProfile ,
            name:name ,
            lastName: lastName,
            userName: userName,
            description: description,
            genre: genre,
            age: age,
            privacy: privacy,
            myLists: myLists
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

const refreshToken = (req, res) => {
    try {
        const payload = req.payload;
        if(!payload) return res.status(401).json({
            error: "Acceso denegado"
        })
        const user = {
            userId: payload._id,
            email: payload.email,
            name : payload.name,
            lastName: payload.lastName,
            userName: payload.userName,
            description: payload.description,
            age: payload.age,
            imgProfile: payload.imgProfile,
            privacy: payload.privacy
        }
        const token = generateToken(user, false)
        const refresh_token = generateToken(user, true)

        res.status(200).json({
            status: "success",
            data: {
                token,
                refresh_token
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "No se ha podido refrescar el token",
            error: error.message,
        })
    }
}


const deleteUserById = (req, res) =>{
    try {
        const idUser = req.params.id
        const  deleteUser = Post.findByIdAndDelete(idUser);
        if(!deleteUser) return res.status(204).json({
            status: "success",
            message: "Cannot found the id"
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
const deleteMyUser = (req, res) =>{c 
    try {
        const idUser = req.payload.userId
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

const getUserByName = async (req, res) => {
    try {
        const userName = req.params.searchValue;
        const user = await Users.find({ userName: { $regex: userName, $options: 'i' } });
        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "The user was not found",
            error: error.message
        });
    }
};


const getSearchedUserDetails = async (req, res) => {
    try {
        const userId = req.params.id
        const userData = await  Users.findById(userId).populate("followers").populate("following");
        if(!userData) return res.status(404).send("No users with that id")

        const userFollowersCount = userData.followers ? userData.followers.length : 0;
        const userFollowingCount = userData.following ? userData.following.length : 0;
        const userLists = userData.myLists ? userData.myLists.length : 0;


        const responseData = {
            ...userData.toObject(),
            followersCount: userFollowersCount,
            followingCount: userFollowingCount,
            lists: userLists
        };
        
        res.status(200).json({
            status: "success",
            data: responseData,

        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot provide the details of the user requested",
            error: error.message
        });
    }
}


const getUserCreatorName = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await Users.findById(userId)
        if(!user) return res.status(404).send("No users with that id")
            console.log(user.userName)
            res.status(200).json({
            status: "success",
            data: user.userName,
            })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot provide the name of the user requested",
            error: error.message
        });
    }
}

const createList = async (req,res) => {
    try {
        const userId = req.payload.userId
        const { name, description } = req.body
        const data = await Users.findById(userId)
        console.log(name)
        console.log(description)

        if(!data) return res.status(404).send("cannot find the user")
        data.myLists.push({
            name: name,
            description: description
        })
        console.log("he pasado el if")
        await data.save()
        console.log(data)

        res.status(200).json({
            status:"success",
            message: "List created succesfully",
        })      

    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot create the list",
            error: error.message
        });
    }
}

const addPostToList = async (req,res) => {
    try {
        const userId = req.payload.userId
        const listId = req.params.id
        const postId = req.body.postId

        const data = await Users.findById(userId)
        console.log(data)
        const list = data.myLists.find(list => list._id == listId)
        console.log(list)
        list.favouritePosts.push(postId)
        await data.save()
        
        res.status(200).json({
            status:"success",
            message: "Post added successfully to the list",
        }) 

    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot push the post",
            error: error.message
        });
    }
}



module.exports = {addNewUser, updateUserData, getAllUsers, loginUser, deleteUserById, getUserByName, deleteMyUser ,getUserDetails, refreshToken, getSearchedUserDetails, getUserCreatorName, createList, addPostToList}