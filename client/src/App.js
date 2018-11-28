import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/login.js';
import Menu from './components/menu.js';
import CalificacionesAlumno from './components/calificaciones.js';
import EstadoCuenta from './components/estadoCuenta.js';
import AplicacionTalleres from './components/talleres.js';
import NoMatch from './components/nomatch.js';

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
              <Route exact path="/alumnos/login" component={Login}/>
              <Route exact path="/alumnos/calificaciones" component={CalificacionesAlumno}/>
              <Route exact path="/alumnos/estado_cuenta" component={EstadoCuenta}/>
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
