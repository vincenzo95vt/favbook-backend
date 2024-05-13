const { error } = require("console");
const Post = require("../models/postsModel");
const { post } = require("../routers/userRouters");



const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find() //Buscamos en  la base de datos
        if (posts.length === 0) return res.status(200).json({
            status: "success",
            message: "There's no Posts in your database", //Mostramos error si no encontramos nada
        })
        res.status(200).json({
            status: "sucess",
            data: posts //Mostramos Postos si encontramos algo en la base de datos.
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot get your request",
            error: error.message
        })
    }
}

const getPostById = async (req, res) => {
    try {
        const idPost = req.params.id //recogemos el request del body basandonos en el id.
        const product = await Product.findById(idPost) //Los mismo que en el getAllProducts, pero solamente buscandolo por el id 
        if (!product) return res.status(200).json({
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

const addNewPost = (req, res) => {
    try {
        const { post, postName, description, comments } = req.body
        const newPost = new Post({ post, postName, description, comments })
        newPost.save()
        return res.status(200).json({
            status: "Success",
            data: newPost
        })
        //Me he quedado a la mitad de esto.
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot add your Post",
            error: error.message
        })
    }
}

const updatePostById = async (req, res) => {
    try {
        const postId = req.params.id
        const { post, postName, description, comments, favourites } = req.body;
        const dataModified = await Post.findByIdAndUpdate({ postId }, {
            $set: {
                post: post,
                postName: postName,
                description: description,
                comments: comments,
                favourites: favourites
            }
        })
        return res.status(200).json({
            status: "Success",
            data: dataModified
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot update the data",
            error: error.message
        })
    }
}

const deletePostById = (req, res) => {
    try {
        const idPost = req.params.id
        const deletedPost = Post.findByIdAndDelete(idPost);
        if (!deletedPost) return res.status(200).json({
            status: "success",
            message: "Cannot found your id"
        })
        return res.status(200).json({
            status: 'Success',
            data: deletedPost
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Cannot delete your data",
            error: error.message
        })
    }
}
// El usuario introduce el nombre del producto que decea buscar 
const getProductsName = async (req, res) => {
    try {
        const postName = req.params.searchValue;
        const post = await Post.find({ postName: { $regex: postName, $options: 'i' } });
        console.log(post)
        if(!post){
            res.status(404).json({
                status:"error",
                message:"cannot search the product",
                error:error.message
            })
        }
        res.status(200).json({
            status: "success",
            data: post,
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "searching for the product",
            error: error.message
        })
    }
};



module.exports = { getAllPosts, getPostById, addNewPost, updatePostById, deletePostById, getProductsName}