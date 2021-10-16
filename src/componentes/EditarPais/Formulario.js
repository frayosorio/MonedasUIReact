import { Button, TextField } from "@material-ui/core";
import React, { useState } from 'react';
import { obtenerEstilosModal } from '../../servicios/Listas';


const Formulario = ({ cerrarFormulario, paisEditado }) => {

    const estilos = obtenerEstilosModal();

    const [pais, setPais] = useState(paisEditado.pais);
    const [codigoAlfa2, setCodigoAlfa2] = useState(paisEditado.codigoAlfa2);
    const [codigoAlfa3, setCodigoAlfa3] = useState(paisEditado.codigoAlfa3);
    const [moneda, setMoneda] = useState(paisEditado.moneda);

    const guardar = (e) => {

        fetch("http://localhost:3010/paises",
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Id: paisEditado.id,
                    Pais: pais,
                    CodigoAlfa2: codigoAlfa2,
                    CodigoAlfa3: codigoAlfa3,
                    //Emisor: emisor
                })
            }
        ).
            then((res) => res.json()).
            then((json) => {
                window.alert(json.moneda);
                cerrarFormulario();
            }).
            catch(function (error) {
                window.alert(`error agregando moneda [${error}]`);
            });
    }

    return (
        <form className={estilos.root} onSubmit={guardar}>
            <TextField
                label="Nombre del país"
                variant="filled"
                required
                value={pais}
                onChange={(e) => { setPais(e.target.value) }}
            />
            <TextField
                label="Código Alfa 2"
                variant="filled"
                required
                value={codigoAlfa2}
                onChange={(e) => { setCodigoAlfa2(e.target.value) }}
            />
            <TextField
                label="Código Alfa 23"
                variant="filled"
                required
                value={codigoAlfa3}
                onChange={(e) => { setCodigoAlfa3(e.target.value) }}
            />
            <TextField
                label="Moneda"
                variant="filled"
                required
                value={moneda}
                onChange={(e) => { setMoneda(e.target.value) }}
            />
            <div>
                <Button variant="contained" onClick={cerrarFormulario}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit" color="Primary">
                    Aceptar
                </Button>
            </div>
        </form>
    )

}


export default Formulario;