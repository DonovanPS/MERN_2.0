const mongoose = require('mongoose');


mongoose.set("strictQuery", true);

mongoose.connect('mongodb://8.tcp.ngrok.io:11096/usuarios_mern');

const objetodb = mongoose.connection

objetodb.on('connected', ()=>{
    console.log('conexion a mongo con exito')
})

objetodb.on('error', ()=>{
    console.log('conexion a mongo a fallado con exito ')
})

module.exports = mongoose