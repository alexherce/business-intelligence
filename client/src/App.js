import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Login from './components/login.js';
import Menu from './components/menu.js';
import CalificacionesAlumno from './components/calificaciones.js';
import EstadoCuentaAlumno from './components/estadoCuenta.js';
import AplicacionTalleres from './components/talleres.js';
import NoMatch from './components/nomatch.js';

// ADMIN components
import MenuAdmin from './components/menuAdmin.js';
import MenuAlumnos from './components/menuAlumnos.js';
import MenuEmpleados from './components/menuEmpleados.js';
import MenuContabilidad from './components/menuContabilidad.js';
import RegistroAlumno from './components/registro.js';
import EstadoCuentaAdmin from './components/estadoCuentaAdmin.js';
import RegistroEmpleado from './components/registroEmpleado.js';
import ListaGrupos from './components/listaGrupos.js';
import ListaEmpleados from './components/listaEmpleados.js';
import ListaAlumnos from './components/listaAlumnos.js';
import ListaMaterias from './components/listaMaterias.js';
import DetalleEmpleado from './components/detalleEmpleado.js';
import DetalleAlumno from './components/detalleAlumno.js';
import DetalleMateria from './components/detalleMateria.js';
import RegistroMateria from './components/registroMateria.js';
import GrupoAlumno from './components/grupoAlumno.js';
import DetalleGrupo from './components/detalleGrupo.js';
import LoginAdmin from './components/login_admin.js';
import CalificacionesAdmin from './components/calificacionesAdmin.js';
import RegistroCalificacion from './components/calificacion.js';
import Contabilidad from './components/contabilidad.js';

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
                <Route exact path="/admin/alumnos/grupos/detalle/estadoCuenta" component={EstadoCuentaAdmin}/>
                <Route exact path="/admin/alumnos/grupos/detalle/:id" component={DetalleGrupo}/>
                <Route exact path="/admin/alumnos/calificaciones/detalle/:id" component={CalificacionesAdmin}/>
                <Route exact path="/admin/alumnos/calificaciones/nuevo/:id" component={RegistroCalificacion}/>
                <Route exact path="/admin/alumnos/grupos/agregar/:id" component={GrupoAlumno}/>
                <Route exact path="/admin/alumnos/grupos" component={ListaGrupos}/>
                <Route exact path="/admin/alumnos/registro" component={RegistroAlumno}/>
                <Route exact path="/admin/alumnos" component={MenuAlumnos}/>
                <Route exact path="/admin/alumnos/lista" component={ListaAlumnos}/>
                <Route exact path="/admin/alumnos/lista/detalle/:id" component={DetalleAlumno}/>
                <Route exact path="/admin/alumnos/materias" component={ListaMaterias}/>
                <Route exact path="/admin/alumnos/materias/detalle/:id" component={DetalleMateria}/>
                <Route exact path="/admin/alumnos/materias/nueva" component={RegistroMateria}/>

                <Route exact path="/admin/contabilidad" component={Contabilidad}/>

                <Route exact path="/admin/empleados/lista/detalle/:id" component={DetalleEmpleado}/>
                <Route exact path="/admin/empleados/lista" component={ListaEmpleados}/>
                <Route exact path="/admin/empleados/registro" component={RegistroEmpleado}/>
                <Route exact path="/admin/empleados" component={MenuEmpleados}/>
                <Route exact path="/admin/contabilidad" component={MenuContabilidad}/>
                <Route exact path="/admin/login" component={LoginAdmin}/>
                <Route exact path="/admin" component={MenuAdmin}/>

                //ALUMNOS
                <Route exact path="/alumnos/login" component={Login}/>
                <Route exact path="/alumnos/calificaciones" component={CalificacionesAlumno}/>
                <Route exact path="/alumnos/estado_cuenta" component={EstadoCuentaAlumno}/>
                <Route exact path="/alumnos/aplicar_taller" component={AplicacionTalleres}/>
                <Route exact path="/" component={Menu}/>
                <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
