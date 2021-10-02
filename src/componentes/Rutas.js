import { Switch, Route } from 'react-router-dom'
import Inicio from '../vistas/Inicio'
import Monedas from '../vistas/Monedas';


const Rutas = () => {
    return (
        <Switch>
            <Route exact path='/' component={Inicio} />
            <Route exact path='/monedas' component={Monedas} />
        </Switch>
    )
}

export default Rutas;
