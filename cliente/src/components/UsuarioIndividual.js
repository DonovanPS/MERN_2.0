import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

function UsuarioIndividual({ usuarios }) {

  const [showMessage, setShowMessage] = useState(false);

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [ocupacion, SetOcupacion] = useState('')

  function deleteDB(id) {
    const config = {
      headers: {
        "ngrok-skip-browser-warning": true,
      }
    }

    axios.delete('/api/usuario/borrarusuario/' + id, config)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log(err)
      })
  }




  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

  return (
    <div>
      <br />
      <br />
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
              <Button onClick={() => deleteDB(rowData.idusuario)} type="submit" label="Borrar" className="mt-2" id="rowData.idusuario" />
            )}
          />
        </DataTable>
      </div>


      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            usuario borrado <b>{nombre}</b> ; borrado con exito.
          </p>

        </div>
      </Dialog>




    </div>
  );









}


export default UsuarioIndividual;






