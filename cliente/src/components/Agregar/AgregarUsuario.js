import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import uniquid from 'uniqid'
import axios from 'axios'

import './AgregarUsuario.css';

function AgregarUsuario() {

    //hooks

    const [showMessage, setShowMessage] = useState(false);

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [ocupacion, SetOcupacion] = useState('')



    function AgregarDB() {
        var usuario = {
            nombre: nombre,
            apellido: apellido,
            ocupacion: ocupacion,
            idusuario: uniquid()
        }   
        
        axios.post('/api/usuario/agregarusuario', usuario)
            .then(res => {
                setShowMessage(true)
            })
            .then(err => {
                console.log(err)
            })
    }





    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Nombre es requerido';
        }

        if (!data.lastname) {
            errors.lastname = 'Apellido requerido';
        }

        if (!data.ocupation) {
            errors.ocupation = 'Ocupacion requerido';
        }


        return errors;
    };

    const onSubmit = (form) => {

        setShowMessage(true);

        form.restart();
    };





    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;


    return (

        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Nuevo usuario  <b>{nombre}</b> <b>{apellido}</b> con ocupacion: <b>{ocupacion}</b> ; registrado con exito.
                    </p>

                </div>
            </Dialog>



            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Register</h2>
                    <Form onSubmit={onSubmit} initialValues={{ name: '', lastname: '', ocupation: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombre*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="lastname" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="lastname" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} value={apellido} onChange={(e) => { setApellido(e.target.value) }} />
                                        <label htmlFor="lastname" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Apellido*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="ocupation" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="ocupation" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} value={ocupacion} onChange={(e) => { SetOcupacion(e.target.value) }} />
                                        <label htmlFor="ocupation" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Ocupacion*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />



                            <Button onClick={AgregarDB} type="submit" label="Guardar" className="mt-2" />

                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}

export default AgregarUsuario