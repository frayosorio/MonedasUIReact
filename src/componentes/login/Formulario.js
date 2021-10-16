import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { obtenerEstilosModal } from '../../servicios/Listas';


const Formulario = ({ cerrarFormulario }) => {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const enviarFormulario = (e) => {
        //Consumir la API para validar las credenciales
        fetch('http://localhost:3010/usuarios/validaracceso', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Usuario: usuario,
                Clave: clave
            })
        }).then((res) => res.json())
            .then((json) => {
                const usuarioLogueado = {
                    id: json.Id,
                    usuario: json.Usuario,
                    nombre: json.Nombre
                }
                if (usuarioLogueado.nombre) {
                    //almacenar los datos del usuario para el resto de la aplicacion
                    const strUsuarioLogueado = JSON.stringify(usuarioLogueado);
                    sessionStorage.setItem("usuarioLogueado", strUsuarioLogueado);
                }
                else {
                    window.alert("Las credenciales no son válidas");
                    sessionStorage.removeItem("usuarioLogueado");
                }
                cerrarFormulario();
            })

    }

    const estilos = obtenerEstilosModal();

    return (
        <form className={estilos.root} onSubmit={enviarFormulario}>
            <TextField
                label="Usuario"
                variante="filled"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />

            <TextField
                label="Clave"
                variante="filled"
                required
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
            />
            <div>
                <Button onClick={cerrarFormulario}>
                    Cerrar
                </Button>
                <Button type="submit" color="primary">
                    Ingresar
                </Button>
            </div>
        </form>
    )

}

export default Formulario;