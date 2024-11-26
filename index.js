const express = require ("express");
const app = express();
const dbConnection = require('./config/bd')

app.get("/", (req, res) => {
    res.send("Esto parece que funciona!!!!")
})

const PORT = 8080;

dbConnection();

app.listen(PORT, () => console.log(`La aplicación esta escuchando en el puerto http://localhost:${PORT}`))