const express = require("express")
const PORT = 4000

const app = express()

app.get("/nombre", (req, res) =>{
    res.setHeader("Content-type", "text/html; charset=utf-8")
    res.end("<h2>Hola Pablo </h2>")
})
app.get("/:parametro")

app.listen(PORT, () => {
        console.log(`Server running in http://localhost:${PORT}`)
})