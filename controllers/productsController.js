const Product = require("../models/productsModel")


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find() //Buscamos en  la base de datos
        if(products.length === 0) return res.status(200).json({
            status: "success",
            message: "There's no products in your database", //Mostramos error si no encontramos nada
        })
        res.status(200).json({
            status:"sucess",
            data: products //Mostramos productos si encontramos algo en la base de datos.
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot get your request",
            error: error.message
        })
    }
}

const getProductsById = async (req, res) => {
    try {
        const idProduct = req.params.id //recogemos el request del body basandonos en el id.
        const product = await Product.findById(idProduct) //Los mismo que en el getAllProducts, pero solamente buscandolo por el id 
        if(!product) return res.status(200).json({
            status: "success",
            message: "There's no product with that id" //Devolvemos error si no encontramos nada con ese id.
        })
        res.status(200).json({
            status: "success",
            data: product //Devolvemos productos si encontramos
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot get the photo", //Si ha habido algun error lo mostramos en un res.status(error)
            error: error.message
        }) 
    }
}

const addNewProduct = (req, res) =>{
    try {
        const {image, productName, description, comments, favourites} = req.body
        const newProduct = new Product({image, productName, description, comments})
        //Me he quedado a la mitad de esto.
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot add your Product",
            error: error.message
        })
    }
}

const updateProductById = (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot update the data",
            error: error.message
        })
    }
}

const deleteProductById = (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot delete your data",
            error: error.message
        })
    }
}

module.exports = {getAllProducts, getProductsById, addNewProduct, updateProductById, deleteProductById}