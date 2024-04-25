const router = require("express").Router()
const {addNewUser, updateUserData, getAllUsers, loginUser} = require("../controllers/userController")


router.post("/signUp", addNewUser)

router.post("/login", loginUser)

router.get("/users", getAllUsers)

router.patch("/", updateUserData)

module.exports = router