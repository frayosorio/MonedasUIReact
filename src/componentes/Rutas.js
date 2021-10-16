import { Switch, Route } from 'react-router-dom'
import Inicio from '../vistas/Inicio'
import Monedas from '../vistas/Monedas';
import Paises from '../vistas/Paises';


const Rutas = () => {
    return (
        <Switch>
            <Route exact path='/' component={Inicio} />
            <Route exact path='/monedas' component={Monedas} />
            <Route exact path='/paises' component={Paises} />
        </Switch>
    )
}

export default Rutas;
