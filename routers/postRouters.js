const router = require("express").Router();
const {
    getAllPosts,
    getPostById,
    addNewPost,
    updatePostById,
    deletePostById,
    getProductsName,
    getPostByName 
} = require("../controllers/postsController")


/**
 * @swagger
 * /posts:
 *   get:
 *       sumary: obtiene todos las imagenes
 *       description: obtiene la coleccion completa de imagenes
 *       responses:
 *            200: 
 *             description: obtiene las imagenes correctamente 
 *            204:
 *              description: Respuesta correcta pero no hay datos
 *            400: 
 *             description: Ha fallado la peticiones de obtener las imagenes
 * 
 * 
 */

router.get("/", getAllPosts) //Recogemos todos los productos.
//para obtenerlos por parametros {id}

router.get("/getProducts/:searchValue", getProductsName); //buscar productos por nombre.

router.get("/:id", getPostById) //Recogemos productos por ID


router.post("/", addNewPost) //Incluimos productos.

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *       sumary: obtiene la imagen por id 
 *       description: obtiene una unica imagen 
 *       parameters: 
 *         - in: path 
 *           name: id
 *           required: true
 *           description: Id del producto
 *           schema: 
 *             type: string 
 *       responses:
 *            200: 
 *             description: obtiene las imagenes correctamente 
 *            204:
 *              description: Respuesta correcta pero no hay datos
 *            400: 
 *             description: Ha fallado la peticiones de obtener las imagenes
 * 
 * 
 */
router.get("/:id", getPostById) //Recogemos productos por ID

router.get("/searchByName/:searchValue", getPostByName)
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea una nueva foto
 *     description: Añade una nueva foto a la colección.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *                 description: URL de la imagen
 *               postName:
 *                 type: string
 *                 description: Nombre del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               userPoster:
 *                 type: string 
 *                 description: ID del usuario que publicó la foto
 *               comments: 
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       description: Contenido del comentario
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha y hora del comentario
 *                 description: Comentarios de los usuarios
 *             required:
 *               - post
 *               - postName
 *               - userPoster
 *     responses:
 *       '201':
 *         description: Se ha creado correctamente la foto
 *       '400':
 *         description: Ha fallado la petición de obtener las imágenes
 */

router.post("/", addNewPost) //Añadimos publicaciones.

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualiza una foto por su ID
 *     description: Actualiza los detalles de una foto existente en la colección utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la foto que se va a actualizar.
 *         schema:
 *           type: string
 *       - in: body
 *         name: updatedPost
 *         required: true
 *         description: Campos actualizados de la foto.
 *         schema:
 *           type: object
 *           properties:
 *             post:
 *               type: string
 *               description: URL de la imagen actualizada.
 *             postName:
 *               type: string
 *               description: Nombre del producto actualizado.
 *             description:
 *               type: string
 *               description: Descripción actualizada del producto.
 *             comments:
 *               type: array
 *               items:
 *                 type: string
 *               description: Comentarios actualizados de los usuarios.
 *             favourites:
 *               type: array
 *               items:
 *                 type: string
 *               description: Favoritos actualizados de la foto.
 *     responses:
 *       '200':
 *         description: Foto actualizada correctamente.
 *       '400':
 *         description: No se puede actualizar la foto.
 */

router.patch("/:id", updatePostById) //Actualizamos productos.

router.delete("/:id", deletePostById) //Eliminamos producto basandonos en el ID.

module.exports = router