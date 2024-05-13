const router = require("express").Router();
const {
    getAllPosts, 
    getPostById, 
    addNewPost, 
    updatePostById, 
    deletePostById,
    getPostByName
} = require("../controllers/postsController")


router.get("/", getAllPosts) //Recogemos todos los productos.

router.get("/:id", getPostById) //Recogemos productos por ID

router.get("/searchByName/:searchValue", getPostByName)

router.post("/", addNewPost) //Añadimos publicaciones.

router.patch("/:id", updatePostById) //Actualizamos productos.

router.delete("/:id", deletePostById) //Eliminamos producto basandonos en el ID.

module.exports = router