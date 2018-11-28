import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class DetalleMateria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false,
      message: '',
      loading: true,
      materia: {
        materia: '',
        id_materia: '',
        hora_inicio: '',
        hora_fin: '',
        profesor: {
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          id_empleado: ''
        },
        grupo: {
          id_grupo: '',
          nivel: '',
          grado: '',
          grupo: '',
          año_escolar: ''
        }
      }
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

        this.getGrupos();
      } else {
        this.props.history.push("/admin/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getGrupos = () => {
    fetch('/api/materias/detalle/' + this.props.match.params.id, {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then((res) => {
      if (!res.success) return this.setState({ loading: false, error: true, message: res.error});

      this.setState({ loading: false, success: true, materia: res });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ loading: false, error: true, message: 'Error'});
    });
  };

  Loading = () => {
    return(
      <div>
        <center><div class="loader"></div></center>
      </div>
    );
  }

  TableDisplay = () => {
    return(
      <div>
        <div class="colorForm">
          <br/>
          <h2>Materia</h2>
          <h5>{this.state.materia.materia}</h5>
          <h2>Hora Inicio</h2>
          <h5>{this.state.materia.hora_inicio}</h5>
          <br/>
          <h2>Hora Fin</h2>
          <h5>{this.state.materia.hora_fin}</h5>
          <br/>
          <h2>Profesor</h2>
          <h5>{this.state.materia.profesor.nombre} {this.state.materia.profesor.apellido_paterno} {this.state.materia.profesor.apellido_materno}</h5>
          <br/>
          <h2>Grupo</h2>
          <h5>ID: {this.state.materia.grupo.id_grupo} | Nivel: {this.state.materia.grupo.nivel} | Grado: {this.state.materia.grupo.grado} | Grupo: {this.state.materia.grupo.grupo}</h5>
          <br/>
          <h2>Año Escolar</h2>
          <h5>{this.state.materia.grupo.año_escolar}</h5>
          <br/>
          <br/>
        </div>
      </div>
    );
  }

  ErrorContent = () => {
    return (
      <div>
        <h1 className="text-danger">ERROR</h1>
        <br/>
        <p>{this.state.message}</p>
      </div>
    );
  }

  RenderContent = () => {
    if (this.state.loading) return <this.Loading/>;
    if (this.state.error) return <this.ErrorContent/>;
    return <this.TableDisplay/>;
  }

  render() {
    return (
      <div>
        <NavigationAdmin/>
        <div class="elementos">
          <div class="itemfullRegistro identificadorForm">
            <this.RenderContent/>
          </div>
        </div>
      </div>
    );
  }
}
