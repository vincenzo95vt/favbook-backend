const router = require("express").Router();
const {
    getAllPosts,
    getPostById,
    addNewPost,
    updatePostById,
    deletePostById,
    getProductsName
} = require("../controllers/postsController")


router.get("/", getAllPosts) //Recogemos todos los productos.

router.get("/getProducts/:searchValue", getProductsName); //buscar productos por nombre.

router.get("/:id", getPostById) //Recogemos productos por ID


router.post("/", addNewPost) //Incluimos productos.

router.patch("/:id", updatePostById) //Actualizamos productos.

router.delete("/:id", deletePostById) //Eliminamos producto basandonos en el ID.

module.exports = router