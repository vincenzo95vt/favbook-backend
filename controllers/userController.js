const Users = require("../models/profileUserSchema")
const bcrypt = require("bcrypt")

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
}

const loginUser = (req, res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "cannot login"
        })
    }
}

const getAllUsers = (req, res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "cannot get the data requested"
        })
    }
}

const updateUserData = (req, res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "cannot modify the user data"
        })
    }
}

module.exports = {addNewUser, updateUserData, getAllUsers, loginUser}