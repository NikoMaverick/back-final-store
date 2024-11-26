const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('BBDD conectada correctamente');
    } catch (error) {
        console.error('No se ha podido conectar a la BBDD', error);
        throw error;
    };
}

module.exports = dbConnection