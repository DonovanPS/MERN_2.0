import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';

function UsuarioIndividual({ usuarios }) {

  function deleteDB(id){
   axios.delete('/api/usuario/borrarusuario/'+id)
   .then(res => {
       alert(res.data)
   })
   .then(err => {
       console.log(err)
   })
  }


  return (
    <div>
        <br/>
        <br/>
    <h2>Lista de usuarios</h2>
    <div className="card">
      <DataTable value={usuarios}>

  
        <Column field="idusuario" header="ID"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="apellido" header="Apellido"></Column>
        <Column field="ocupacion" header="Ocupación"></Column>
        <Column
          body={rowData => (
            <Button
              onClick={() => {
                console.log(`Editar usuario ${rowData.idusuario}`);
              }}
            >
              Editar
            </Button>
          )}
        />
        <Column
          body={rowData => (
            <Button onClick={()=>deleteDB(rowData.idusuario)} type="submit" label="Borrar" className="mt-2" id="rowData.idusuario" />
          )}
        />
      </DataTable>
    </div>
  </div>
);
}


export default UsuarioIndividual;






