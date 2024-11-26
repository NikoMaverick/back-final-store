const express = require ("express");
const app = express();
const dbConnection = require('./config/bd');
const router = require('./routes/productRoutes')


app.get("/", router)

dbConnection()
.then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`La aplicación esta escuchando en el puerto http://localhost:${PORT}`))
    })
    .catch((err) => {
        console.error('Error de conexión a la BBDD:', err)
    });
