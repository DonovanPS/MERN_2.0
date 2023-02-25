import axios from "axios";
import React, { useState } from "react";

function Txt() {

  const[datatex, setdatatex]=useState([])
  axios.get('api/usuario/obtenertxt').then(res => {
    setdatatex(res.data)
  }).catch(err =>{
    console.log(err)
  })

  return (

    <div>

      <h2>Txt</h2>
      
      <p>{datatex}</p>
    </div>
  );
}

export default Txt;