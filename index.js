const express = require ("express");
const app = express();
const dbConnection = require('./config/bd');
const { error } = require("console");

app.get("/", (req, res) => {
    res.send("Esto parece que funciona!!!!")
})


dbConnection()
.then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`La aplicación esta escuchando en el puerto http://localhost:${PORT}`))
    })
    .catch((error) => {
        console.error('Error de conexión a la BBDD:', error)
    });
