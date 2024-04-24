const router = require("express").Router();
const {
    getAllProducts, 
    getProductsById, 
    addNewProduct, 
    updateProductById, 
    deleteProductById
} = require("../controllers/productsController")


router.get("/", getAllProducts) //Recogemos todos los productos.

router.get("/:id", getProductsById) //Recogemos productos por ID

router.post("/", addNewProduct) //Incluimos productos.

router.patch("/:id", updateProductById) //Actualizamos productos.

router.delete("/:id", deleteProductById) //Eliminamos producto basandonos en el ID.