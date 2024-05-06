const router = require("express").Router()
const {addNewUser, updateUserData, getAllUsers, loginUser, deleteUserById} = require("../controllers/userController")
const verifyToken = require("../middlewares/auth")

/**
 * @swagger
 * /user:
 *   post:
    *    summary: Registro
    *    description: Registra un nuevo usuario
    *    requestBody:
    *         required: true
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 userName: 
    *                   type: string
    *                   description: El nombre de usuario
    *                 email: 
    *                   type: string
    *                   description: El correo electronico
    *                 password: 
    *                   type: string
    *                   description: La contraseña de la cuenta
    *                 age: 
    *                   type: number
    *                   description: La edad del usuario
    *                 name: 
    *                   type: string
    *                   description: El nombre real del usuario
    *                 lastName: 
    *                   type: string
    *                   description: El apellido real del usuario
    *                 genre: 
    *                   type: string
    *                   description: El genero real del usuario
    *    responses:
    *         201: 
    *          description: Usuario creado correctamente 
    *         400: 
    *          description: No se ha podido crear el usuario
 */
router.post("/signUp", addNewUser) //Nos registramos

/**
 * @swagger
 * /user:
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
router.post("/login", loginUser) //Nos logueamos

/**
 * @swagger
 * /user:
 *   get:
 *       summary: Obtiene usuarios
 *       description: Obtiene todos los datos de los usuarios
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
router.get("/users", verifyToken, getAllUsers)//Cogemos los datos de los usuarios.

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Actualizar usuario
 *     description: Actualiza los datos de los usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario que se va a actualizar
 *         schema:
 *           type: string
 *       - in: body
 *         name: updateUser
 *         required: true
 *         description: Campos actualizados del usuario
 *         schema:
 *           type: object
 *           properties:
 *             userName: 
 *               type: string
 *               description: El nombre de usuario
 *             email: 
 *               type: string
 *               description: El correo electronico
 *             password: 
 *               type: string
 *               description: La contraseña de la cuenta
 *             age: 
 *               type: number
 *               description: La edad del usuario
 *             name: 
 *               type: string
 *               description: El nombre real del usuario
 *             lastName: 
 *               type: string
 *               description: El apellido real del usuario
 *             genre: 
 *               type: string
 *               description: El genero real del usuario
 *     responses:
 *         200:
 *          description: Usuario actualizado correctamente
 *         400:
 *          description: No se puede actualizar el usuario
 */
router.patch("/:id", updateUserData) //Modificamos los datos de usuario.(Podemos ponerlo con o sin verificacion de Admin)

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     description: Elimina un usuario mediante el ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario que va a ser eliminado
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario eliminado correctamente
 *       '204':
 *         description: No se encuentra ningun usario con ese ID
 *       '400':
 *         description: No se puede eliminar el usuario
 */
router.delete("/:id", deleteUserById) //Borramos usuario mediante el id.(Aqui ponemos verifyAdmin)

module.exports = router