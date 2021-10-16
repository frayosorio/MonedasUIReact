import Formulario from "./Formulario";
import Dialog from '@material-ui/core/Dialog';

const ModalEditar = ({ open, cerrar, pais }) => {

    return (
        <Dialog open={open} onClose={cerrar}>
            <Formulario cerrarFormulario={cerrar} paisEditado={pais}/>
        </Dialog>

    )
}

export default ModalEditar;