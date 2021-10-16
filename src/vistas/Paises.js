import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import { listarPaises, obtenerEstilos, Pais } from '../servicios/Listas';
import { Button } from "@material-ui/core";
import ModalEditar from '../componentes/EditarPais/Modal';

const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "pais", headerName: "País", width: 300 },
    { field: "codigoAlfa2", headerName: "Código Alfa 2", width: 100 },
    { field: "codigoAlfa3", headerName: "Código Alfa 3", width: 100 },
    { field: "moneda", headerName: "Moneda", width: 300 },
]

const Paises = () => {


    const estilos = obtenerEstilos();

    //variable que almacenará la lista de monedas
    const [paises, setPaises] = useState([]);

    const [estadoListado, setEstadoListado] = useState(true);

    const [paisEditado, setPaisEditado] = useState({});

    const [estadoModal, setEstadoModal] = useState(false);

    async function obtenerPaises() {

        const paisesT = await listarPaises();
        setPaises(paisesT);
        setEstadoListado(false);
    }

    var paisSeleccionado;

    if (estadoListado) {
        obtenerPaises();
    }

    const cerrarModal = () => {
        setEstadoModal(false);
    }

    const agregar = () => {
        const paisE = new Pais(-1, "", "", "", -1, "", "");
        setPaisEditado(paisE);
        setEstadoModal(true);
    }

    const modificar = () => {
        if (paisSeleccionado) {
            const paisE = paisSeleccionado;
            setPaisEditado(paisE);
            setEstadoModal(true);
        }
        else {
            window.alert("Por favor seleccione la moneda a editar");
        }
    }

    const eliminar = () => {

    }

    return (
        <div>
            <center>
                <h1>
                    Lista de Paises
                </h1>
            </center>
            <div style={{ height: 500, width: '100%' }}>
                <Button className={estilos.botonAgregar} onClick={agregar}>
                    Agregar
                </Button>
                <Button className={estilos.botonModificar} onClick={modificar}>
                    Modificar
                </Button>
                <Button className={estilos.botonEliminar} onClick={eliminar}>
                    Eliminar
                </Button>
                <DataGrid
                    rows={paises}
                    columns={columnas}
                    pageSize={7}
                    rowsPerPageOptions={[7]}

                    onSelectionModelChange={(idPaises) => {
                        const paisesSeleccionados = paises.filter(
                            function (fila) {
                                return fila.id == idPaises[0];
                            }
                        );
                        paisSeleccionado = paisesSeleccionados[0];
                    }
                    }

                />

                <ModalEditar open={estadoModal} cerrar={cerrarModal} pais={paisEditado} />

            </div>
        </div>
    )
}

export default Paises;