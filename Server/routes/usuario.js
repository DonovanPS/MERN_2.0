const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const { google} = require('googleapis');
const { content } = require('googleapis/build/src/apis/content');
const key = require('../json/credenciales.json');
const scopes = 'https://www.googleapis.com/auth/drive';

let contenido = "";

//require('../drive')

const eschemausuario = new eschema({
    nombre: String,
    apellido: String,
    ocupacion: String,
    idusuario: String
})

const ModeloUsuario = mongoose.model('usuarios', eschemausuario)
module.exports = router


router.get('/ejemplo', (req, res)=>{
    res.end('funcionando las rutas')
})

//agregar
router.post('/agregarusuario',(req, res) =>{
    const nuevousuario = new ModeloUsuario({
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        ocupacion: req.body.ocupacion,
        idusuario: req.body.idusuario
    })
    nuevousuario.save(function(err){
        if(!err){
            res.send('Se agrego el usuario')
        }else{
            res.send(err)
        }
    })
})


//obtener txt
router.get('/obtenertxt', (req,res) =>{




const auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    scopes
  );

const drive = google.drive({ version: 'v3', auth });

// obtener id archivos de drive

/*
drive.files.list({
  q: "trashed = false",
  fields: 'nextPageToken, files(id, name)',
}, (err, res) => {
  if (err) return console.error('Error al obtener la lista de archivos:', err);
  const files = res.data.files;
  if (files.length) {
    console.log('Archivos:');
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log('No se encontraron archivos.');
  }
});
*/

// ID del archivo que deseas leer

const fileId = '1MsKI22E5KlYJQUGOMmEKSFAOmaN9s2gp';

// Lee el contenido del archivo
drive.files.get({fileId: fileId, alt: 'media'}, {responseType: 'stream'}, (err, res) => {
  if (err) {
    console.log('Error al leer el archivo:', err);
    return;
  }


  // Convierte el contenido en una cadena de texto
  const chunks = [];
  res.data.on('data', (chunk) => {
    chunks.push(chunk);
  });
  res.data.on('end', () => {
    const content = Buffer.concat(chunks).toString('utf8');
    //console.log('Contenido del archivo:', content);
    contenido=content;
    //console.log(contenido);
    
  });
});
setTimeout(() => {
    res.send(contenido)

  }, 3000);
})   




//obtener todos
router.get('/obtenerusuarios', (req,res) =>{
    ModeloUsuario.find({},function(docs,err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//borrar
router.delete('/borrarusuario/:id', (req,res) =>{
    const id = req.params['id'];
    console.log(id);
    ModeloUsuario.findOneAndDelete({idusuario: id},function(docs,err){
        if(!err){
            res.send("Eliminado con exito")
        }else{
            res.send(err)
        }
    })
})

//Consultar por id
router.get('/obtenerindividual/:id', (req,res) =>{
  const id = req.params['id'];
  ModeloUsuario.findOne({idusuario: id}, function(err, doc){
      if(!err){
          res.send(doc)
      }else{
          res.send(err)
      }
  })
})

//Actualizar
router.put('/actuaizarusuario/:id',(req, res) =>{
  const id = req.params.id;
  const update = req.body;

  ModeloUsuario.findOneAndUpdate({ idusuario: id }, update, { new: true }, (err, doc) => {
    if (err) {
      console.log('Error al actualizar el usuario:', err);
      res.send(err);
    } else {
      //console.log('Usuario actualizado:', doc);
      res.send('Usuario actualizado');
    }
  });
});