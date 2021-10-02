import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';

const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "moneda", headerName: "Nombre", width: 300 },
    { field: "sigla", headerName: "Sigla", width: 100 },
    { field: "simbolo", headerName: "Símbolo", width: 100 },
    { field: "emisor", headerName: "Entidad Emisora", width: 300 },
]


const Monedas = () => {

    //variable que almacenará la lista de monedas
    const [monedas, setMonedas] = useState([]);

    //Consultar la lista de monedas desde la API
    fetch("http://localhost:3010/monedas", { method: "get" })
        .then((res) => res.json())
        .then((json) => {
            var monedasT = [];
            json.map((item) => {
                monedasT.push({
                    id: item.Id,
                    moneda: item.Moneda,
                    sigla: item.sigla,
                    simbolo: item.Simbolo,
                    emisor: item.Emisor
                });
            });
            setMonedas(monedasT);
        });


    return (
        <div>
            <center>
                <h1>
                    Lista de Monedas
                </h1>
            </center>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={monedas}
                    columns={columnas}
                    pageSize={7}
                    rowsPerPageOptions={[7]}

                />
            </div>
        </div>
    )
}

export default Monedas;