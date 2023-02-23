const express = require('express')
const app = express()

//importar body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

// importar conexion mongo
const archivoDB = require('./Conexion')

// importar del archivo rutas y modelo usuario
const rutausuario = require('./routes/usuario')

app.use('/api/usuario',rutausuario)

app.get('/',(req,res)=>{
    res.end('Bienvenido servidor backend')
})

//configuracion server
app.listen(5000,function(){
    console.log('Escuchando')
})