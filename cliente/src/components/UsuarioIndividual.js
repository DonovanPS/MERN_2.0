import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

function UsuarioIndividual({ usuarios }) {

  const [showMessagedelete, setShowMessageDelete] = useState(false);
  const [showMessageupdate, setShowMessageUpdate] = useState(false);
  const [showMessageUpdateConfirm, setShowMessageUpdateConfirm] = useState(false);

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [ocupacion, SetOcupacion] = useState('')
  const [iduser, SetId] = useState('')

  function deleteDB(id) {
    const config = {
      headers: {
        "ngrok-skip-browser-warning": true,
      }
    }

    axios.delete('/api/usuario/borrarusuario/' + id, config)
      .then(res => {

        setNombre(res.data.nombre);
        setApellido(res.data.apellido);
        SetOcupacion(res.data.ocupacion)

        setShowMessageDelete(true)
      })
      .then(err => {
        console.log(err)
      })
  }


  function update(id) {

    const config = {
      headers: {
        "ngrok-skip-browser-warning": true,
      }
    }

    axios.get('/api/usuario/obtenerindividual/' + id, config)
      .then(res => {

        setNombre(res.data.nombre);
        setApellido(res.data.apellido);
        SetOcupacion(res.data.ocupacion)
        SetId(res.data.idusuario)

        

        setShowMessageUpdate(true)
      })
      .then(err => {
        console.log(err)
      })
 
  }

  function updateDB(){

    var usuario = {
      id:iduser,
      nombre: nombre,
      apellido: apellido,
      ocupacion: ocupacion,
      
  }

    const config = {
      headers: {
        "ngrok-skip-browser-warning": true,
      }
    }

    console.log(usuario);

    axios.put('/api/usuario/actuaizarusuario/'+usuario.id,usuario,config)
    .then(res=>{

      console.log(res);
      setShowMessageUpdateConfirm(true)

    }).then(err => {
        console.log(err)
      })

  }

  useEffect(() => {

  }, [nombre], [apellido], [ocupacion],[iduser]);




  const dialogFooterDelete = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessageDelete(false)} /></div>;
  const dialogFooterUpdate = <div className="flex justify-content-center"><Button label="Cancelar" className="p-button-text" autoFocus onClick={() => setShowMessageUpdate(false)} /><Button label='Actualizar' onClick={()=>updateDB()} /></div>;
  const dialogFooterUpdateConfirm = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessageUpdateConfirm(false)|setShowMessageUpdate(false)} /></div>;

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Ocupación: ${ocupacion}`);
  }


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
              <Button onClick={() => update(rowData.idusuario)} type="submit" label="Actualizar" className="mt-2" />

            )}
          />
          <Column
            body={rowData => (
              <Button onClick={() => deleteDB(rowData.idusuario)} type="submit" label="Borrar" className="mt-2" id="rowData.idusuario" />
            )}
          />
        </DataTable>
      </div>


      <Dialog visible={showMessagedelete} onHide={() => setShowMessageDelete(false)} position="top" footer={dialogFooterDelete} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Delete Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Usuario <b>{nombre}</b> <b>{apellido}</b> con ocupacion <b>{ocupacion}</b>; borrado con exito.
          </p>
        </div>
      </Dialog>



      <Dialog visible={showMessageUpdateConfirm} onHide={() => setShowMessageDelete(false)} position="top" footer={dialogFooterUpdateConfirm} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-refresh" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Delete Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Usuario <b>{nombre}</b> <b>{apellido}</b> con ocupacion <b>{ocupacion}</b>; Actualizado con exito.
          </p>
        </div>
      </Dialog>


      <Dialog visible={showMessageupdate} onHide={() => setShowMessageUpdate(false)} position="top" footer={dialogFooterUpdate} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '1000px' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
          
          <h5>Actualizar</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
          </p>


          <form onSubmit={handleSubmit}>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-briefcase"></i>
              </span>
              <InputText value={ocupacion} onChange={(e) => SetOcupacion(e.target.value)} placeholder="Ocupación" />
            </div>
          </form>



        </div>
      </Dialog>



    </div>
  );









}


export default UsuarioIndividual;






