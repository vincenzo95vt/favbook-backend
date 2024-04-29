const router = require("express").Router()
const {addNewUser, updateUserData, getAllUsers, loginUser, deleteUserById} = require("../controllers/userController")
const verifyToken = require("../middlewares/auth")


router.post("/signUp", addNewUser) //Nos registramos

router.post("/login", verifyToken,loginUser) //Nos logueamos

router.get("/users", getAllUsers)//Cogemos los datos de los usuarios.

router.patch("/:id", updateUserData) //Modificamos los datos de usuario.(Podemos ponerlo con o sin verificacion de Admin)

router.delete("/:id", deleteUserById) //Borramos usuario mediante el id.(Aqui ponemos verifyAdmin)

module.exports = router