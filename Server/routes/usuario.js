const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema

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