import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class RegistroGrupo extends Component {
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

    fetch('/api/grupos/crear', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        "nivel": event.target.nombre.value,
        "grado": event.target.grado.value,
        "grupo": event.target.grupo.value,
        "id_profesor": event.target.id_profesor.value,
        "año_escolar": event.target.año_escolar.value
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
          <label for="nivel">Nivel</label>
          <br/>
          <input type="text" id="nivel" name="nivel" placeholder="Nivel.." required/>
          <br/>
          <label for="grado">Grado</label>
          <br/>
          <input type="text" id="grado" name="grado" placeholder="Grado.." required/>
          <br/>
          <label for="grupo">Grupo</label>
          <br/>
          <input type="text" id="grupo" name="grupo" placeholder="Grupo.." required/>
          <br/>
          <label for="id_profesor">ID Profesor</label>
          <br/>
          <input type="text" id="id_profesor" name="id_profesor" placeholder="ID profesor.." required/>
          <br/>
          <label for="año_escolar">Año Escolar</label>
          <br/>
          <input type="text" id="año_escolar" name="año_escolar" placeholder="Año Escolar.." required/>
          <br/>
          <input type="submit" value="Agregar Grupo"/>
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
        <h2 className="text-center">Agregar Nuevo Grupo</h2>
        <div class="elementos">
          <div class="itemfullRegistro identificadorForm">
            <this.RenderContent/>
          </div>
        </div>
      </div>
    );
  }
}
