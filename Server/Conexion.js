const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

mongoose.connect('mongodb://2.tcp.ngrok.io:13195/usuarios_mern');

//mongoose.connect('mongodb://127.0.0.1:27017/usuarios_mern');


const objetodb = mongoose.connection

objetodb.on('connected', ()=>{
    console.log('conexion a mongo con exito')
})

objetodb.on('error', ()=>{
    console.log('conexion a mongo a fallado con exito ')
})

module.exports = mongoose