const router = require("express").Router()
const {addNewUser, updateUserData, getAllUsers, loginUser, deleteUserById, deleteMyUser, getUserDetails} = require("../controllers/userController")
const {verifyToken, verifyAdmin} = require("../middlewares/auth")

/**
 * @swagger
 * /user/signUp:
 *   post:
 *       summary: Registro
 *       description: Registra un nuevo usuario
 *       requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    userName:
 *                      type: string
 *                      description: El nombre de usuario
 *                    email:
 *                      type: string
 *                      description: El correo electronico
 *                    password:
 *                      type: string
 *                      description: La contraseña de la cuenta
 *                    age:
 *                      type: number
 *                      description: La edad del usuario
 *                    name:
 *                      type: string
 *                      description: El nombre real del usuario
 *                    lastName:
 *                      type: string
 *                      description: El apellido real del usuario
 *                    genre:
 *                      type: string
 *                      description: El genero real del usuario
 *                    role: 
 *                      type: string
 *                      description: El rol del usuario
 *       responses:
 *            201:
 *             description: Usuario creado correctamente
 *            400:
 *             description: No se ha podido crear el usuario
 */
router.post("/signUp", addNewUser); //Nos registramos

/**
 * @swagger
 * /user/login:
 *   post:
 *       summary: Inicio de sesion
 *       description: Inicio de sesion con un usuario existente
 *       requestBody:
 *            require: true
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      description: El correo electronico
 *                    password:
 *                      type: string
 *                      description: La contraseña de la cuenta
 *       responses:
 *            200:
 *             description: El usuario ha iniciado sesion correctamente
 *            203:
 *             description: La peticion es correcta pero no coinciden el email y la contraseña
 *            401:
 *             description: No se ha podido iniciar sesion
 */
router.post("/login", loginUser); //Nos logueamos

/**
 * @swagger
 * /user/users:
 *   get:
 *       summary: Obtiene usuarios
 *       description: Obtiene todos los datos de los usuarios
 *       parameters:
 *       - in: header
 *         name: auth-token
 *         description: Campo para pasarle el token del usuario
 *         required: true
 *         type: string
 *       responses:
 *            200:
 *             description: obtiene los datos de los usuarios correctamente
 *            204:
 *              description: Peticion correcta pero no hay datos
 *            400:
 *             description: Ha fallado la peticiones de obtener los datos de usuarios
 *
 *
 */
router.get("/users", verifyToken, getAllUsers); //Cogemos los datos de los usuarios.

router.get("/users", verifyToken, getAllUsers) //Cogemos los datos de los usuarios.

router.get("/profileUser", verifyToken, getUserDetails) 

router.patch("/updateUserDetails", verifyToken, updateUserData) //Modificamos los datos de usuario.(Podemos ponerlo con o sin verificacion de Admin)

router.delete("/deleteUser", verifyToken, deleteMyUser) //Para el usuario que quiera borrar su propia cuenta.

router.delete("/:id", verifyAdmin, deleteUserById) //Borramos usuario mediante el id.(Aqui ponemos verifyAdmin)


module.exports = router
