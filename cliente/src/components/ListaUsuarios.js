import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UsuarioIndividual from './UsuarioIndividual'

function ListaUsuarios(){

    const[datausuarios, setdatausuario]=useState([])

    useEffect(()=>{
      axios.get('api/usuario/obtenerusuarios').then(res => {
        //console.log(res.data)
        setdatausuario(res.data)
      }).catch(err =>{
        console.log(err)
      })

    },[])
   
    return(
        <div>
           <UsuarioIndividual usuarios={datausuarios} />
        </div>


    )
}

export default ListaUsuarios