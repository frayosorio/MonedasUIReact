import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ModalEditar from '../componentes/EditarMoneda/Modal';

const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "moneda", headerName: "Nombre", width: 300 },
    { field: "sigla", headerName: "Sigla", width: 100 },
    { field: "simbolo", headerName: "Símbolo", width: 100 },
    { field: "emisor", headerName: "Entidad Emisora", width: 300 },
]

var Moneda = function (id, moneda, sigla, simbolo, emisor) {
    this.id = id;
    this.moneda = moneda;
    this.sigla = sigla;
    this.simbolo = simbolo;
    this.emisor = emisor;
}

const obtenerEstilos = makeStyles(theme => ({
    botonAgregar: {
        borderRadius: 15,
        backgroundColor: "#21b6ae",
        padding: "10px 10px",
        fontSize: "18px"
    },
    botonModificar: {
        borderRadius: 15,
        backgroundColor: "#55ff55",
        padding: "10px 10px",
        fontSize: "18px"
    },
    botonEliminar: {
        borderRadius: 15,
        backgroundColor: "#ff5555",
        padding: "10px 10px",
        fontSize: "18px"
    }

}));

const Monedas = () => {

    const estilos = obtenerEstilos();

    //variable que almacenará la lista de monedas
    const [monedas, setMonedas] = useState([]);

    const [estadoListado, setEstadoListado] = useState(true);

    const [estadoModal, setEstadoModal] = useState(false);

    const [monedaEditada, setMonedaEditada] = useState({});

    const obtenerMonedas = () => {
        //Consultar la lista de monedas desde la API
        fetch("http://localhost:3010/monedas", { method: "get" })
            .then((res) => res.json())
            .then((json) => {
                var monedasT = [];
                json.map((item) => {
                    monedasT.push(new Moneda(item.Id,
                        item.Moneda,
                        item.Sigla,
                        item.Simbolo,
                        item.Emisor
                    ));
                });
                setMonedas(monedasT);
                setEstadoListado(false);
            });
    }

    if (estadoListado) {
        obtenerMonedas();
    }

    const cerrarModal = () => {
        setEstadoModal(false);
    }

    const agregar = () => {
        const monedaE = new Moneda(-1, "", "", "", "");
        setMonedaEditada(monedaE);

        setEstadoModal(true);
    }

    const modificar = () => {
        const monedaE = monedaSeleccionada;
        setMonedaEditada(monedaE);

        setEstadoModal(true);
    }

    var monedaSeleccionada;

    return (
        <div>
            <center>
                <h1>
                    Lista de Monedas
                </h1>
            </center>
            <div style={{ height: 500, width: '100%' }}>
                <Button className={estilos.botonAgregar} onClick={agregar}>
                    Agregar
                </Button>
                <Button className={estilos.botonModificar} onClick={modificar}>
                    Modificar
                </Button>
                <Button className={estilos.botonEliminar}>
                    Eliminar
                </Button>
                <DataGrid
                    rows={monedas}
                    columns={columnas}
                    pageSize={7}
                    rowsPerPageOptions={[7]}

                    onSelectionModelChange={(idMonedas) => {
                        const monedasSeleccionadas = monedas.filter(
                            function (fila) {
                                return fila.id == idMonedas[0];
                            }
                        );
                        monedaSeleccionada = monedasSeleccionadas[0];
                    }
                    }

                />

                <ModalEditar open={estadoModal} cerrar={cerrarModal} moneda={monedaEditada} />
            </div>
        </div>
    )
}

export default Monedas;