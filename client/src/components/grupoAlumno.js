import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class GrupoAlumno extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false,
      message: ''
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    fetch('/api/sesion/empleado')
    .then(res => res.json())
    .then((res) => {
      if (res) {
        if (!res.success) return this.props.history.push("/admin/login");
      } else {
        this.props.history.push("/admin/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    fetch('/api/grupos/inscribir', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        "id_estudiante": event.target.id.value,
        "id_grupo": this.props.match.params.id
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.success) return this.setState({ loading: false, success: true, message: 'Alumno Añadido!'});
      console.log(res);
      this.setState({ loading: false, error: true, message: res.error});
    })
    .catch((error) => {
      console.log(error);
    });
  };

  Loading = () => {
    return(
      <div>
        <center><div class="loader"></div></center>
      </div>
    );
  }

  FormDisplay = () => {
    return(
      <div>
        <form method="POST" onSubmit={this.handleSubmit}>
          <br/>
            <label for="id">ID del alumno</label>
            <br/>
            <input type="text" id="id" name="id" placeholder="ID del alumno.."/>
            <br/>
            <input type="submit" value="Agregar a Grupo"/>
            <br/>

            {this.state.error ? (
              <h5 className="text-danger text-center">{this.state.message}</h5>
            ) : null }
            {this.state.success ? (
              <h5 className="text-success text-center">{this.state.message}</h5>
            ) : null }
        </form>
      </div>
    );
  }

  RenderContent = () => {
    if (this.state.loading) return <this.Loading/>;
    return <this.FormDisplay/>;
  }

  render() {
    return (
      <div>
        <NavigationAdmin/>
        <br/>
        <h2 className="text-center">Agregar alumno a grupo</h2>
            <div class="elementos">
              <div class="itemfullRegistro identificadorForm">
              <this.RenderContent/>
              </div>
          </div>
      </div>
    );
  }
}
