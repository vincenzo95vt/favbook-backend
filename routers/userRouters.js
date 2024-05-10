const router = require("express").Router()
const {addNewUser, updateUserData, getAllUsers, loginUser, deleteUserById, getUserDetails} = require("../controllers/userController")
const verifyToken = require("../middlewares/auth")


router.post("/signUp", addNewUser) //Nos registramos

router.post("/login",   loginUser) //Nos logueamos

router.get("/users", verifyToken, getAllUsers)//Cogemos los datos de los usuarios.

router.get("/profileUser", verifyToken, getUserDetails)

router.patch("/updateUserDetais", verifyToken, updateUserData) //Modificamos los datos de usuario.(Podemos ponerlo con o sin verificacion de Admin)

router.delete("/:id", deleteUserById) //Borramos usuario mediante el id.(Aqui ponemos verifyAdmin)

module.exports = router