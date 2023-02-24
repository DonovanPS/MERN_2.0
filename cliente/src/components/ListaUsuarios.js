import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UsuarioIndividual from './UsuarioIndividual'

function ListaUsuarios(){

    const[datausuarios, setdatausuario]=useState([])

    useEffect(()=>{
      const config = {
        headers: {
          "ngrok-skip-browser-warning": true,
        }
      }

      axios.get('api/usuario/obtenerusuarios', config).then(res => {
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