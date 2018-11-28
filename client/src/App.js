import React, { Component } from 'react';
import './App.css';

import Login from './components/login.js';
import Menu from './components/menu.js';
import CalificacionesAlumno from './components/calificaciones.js';
import EstadoCuenta from './components/estadoCuenta.js';
import AplicacionTalleres from './components/talleres.js';

class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

    render() {
    const { passwords } = this.state;

        return (
            //<Login/>
            //<Menu/>
            //<CalificacionesAlumno/>
            //<EstadoCuenta/>
            <AplicacionTalleres/>
        );
    }
}

export default App;
