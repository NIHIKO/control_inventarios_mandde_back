require('dotenv').config();

module.exports = {
    puerto: process.env.API_PUERTO || 4000,
    secreto: process.env.SECRET || 'ppmManddeSecret216!!..',
    apiDir: process.env.API_BASE || '/api/'
};