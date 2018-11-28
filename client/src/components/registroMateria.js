import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class RegistroMateria extends Component {
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

    fetch('/api/materias/crear', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        "nombre": event.target.nombre.value,
        "hora_inicio": event.target.hora_inicio.value,
        "hora_fin": event.target.hora_fin.value,
        "id_profesor": event.target.id_profesor.value,
        "id_grupo": event.target.id_grupo.value
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.success) return this.setState({ loading: false, success: true, message: 'Materia Añadida!'});
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
          <label for="nombre">Nombre</label>
          <br/>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre materia.." required/>
          <br/>
          <label for="hora_inicio">Hora de Inicio</label>
          <br/>
          <input type="text" id="hora_inicio" name="hora_inicio" placeholder="12:30.." required/>
          <br/>
          <label for="hora_fin">Hora de Fin</label>
          <br/>
          <input type="text" id="hora_fin" name="hora_fin" placeholder="13:00.." required/>
          <br/>
          <label for="id_profesor">ID Profesor</label>
          <br/>
          <input type="text" id="id_profesor" name="id_profesor" placeholder="ID profesor.." required/>
          <br/>
          <label for="id_grupo">ID Grupo</label>
          <br/>
          <input type="text" id="id_grupo" name="id_grupo" placeholder="ID grupo.." required/>
          <br/>
          <input type="submit" value="Agregar Materia"/>
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
        <h2 className="text-center">Agregar Nueva Materia</h2>
        <div class="elementos">
          <div class="itemfullRegistro identificadorForm">
            <this.RenderContent/>
          </div>
        </div>
      </div>
    );
  }
}
