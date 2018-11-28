import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Login from './components/login.js';
import Menu from './components/menu.js';
import CalificacionesAlumno from './components/calificaciones.js';
import EstadoCuenta from './components/estadoCuenta.js';
import AplicacionTalleres from './components/talleres.js';
import NoMatch from './components/nomatch.js';

// ADMIN components
import MenuAdmin from './components/menuAdmin.js';
import MenuAlumnos from './components/menuAlumnos.js';
import MenuContabilidad from './components/menuContabilidad.js';
import RegistroAlumno from './components/registro.js';
import ListaGrupos from './components/listaGrupos.js';
import DetalleGrupo from './components/detalleGrupo.js';

class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
                //ADMIN
                <Route exact path="/admin/alumnos/grupos/detalle" component={DetalleGrupo}/>
                <Route exact path="/admin/alumnos/grupos" component={ListaGrupos}/>
                <Route exact path="/admin/alumnos/registro" component={RegistroAlumno}/>
                <Route exact path="/admin/alumnos" component={MenuAlumnos}/>
                <Route exact path="/admin/contabilidad" component={MenuContabilidad}/>
                <Route exact path="/admin" component={MenuAdmin}/>

                //ALUMNOS
                <Route exact path="/alumnos/login" component={Login}/>
                <Route exact path="/alumnos/calificaciones" component={CalificacionesAlumno}/>
                <Route exact path="/alumnos/estado_cuenta" component={EstadoCuenta}/>
                <Route exact path="/alumnos/aplicar_taller" component={AplicacionTalleres}/>
                <Route exact path="/alumnos" component={Menu}/>
                <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
