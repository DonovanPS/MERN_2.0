const express = require('express')
const app = express()
const ngrok = require('ngrok');

//importar body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}));

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

const ngrokRun = async () => {
    await ngrok.authtoken('2LnOnYtyo4oPqRbCzvARl53ltgm_kGpov8Eo4dV73NHNC6ZQ');

    await ngrok.connect({
        proto : 'http',
        addr : 5000,
    }, (err, url) => {
        if (err) {
            console.error('Error while connecting Ngrok',err);
            return new Error('Ngrok Failed');
        }
    });
}

ngrokRun();