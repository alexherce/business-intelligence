import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class DetalleAlumno extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false,
      message: '',
      loading: true,
      estudiante: {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        curp: '',
        alergias: '',
        dia_nacimiento: '',
        mes_nacimiento: '',
        año_nacimiento: ''
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
    fetch('/api/estudiantes/detalle/' + this.props.match.params.id, {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then((res) => {
      if (!res.success) return this.setState({ loading: false, error: true, message: res.error});

      this.setState({ loading: false, success: true, estudiante: res });
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
          <h2>CURP</h2>
          <h5>{this.state.estudiante.curp}</h5>
          <br/>
          <h2>Nombre(s)</h2>
          <h5>{this.state.estudiante.nombre}</h5>
          <br/>
          <h2>Apellido Paterno</h2>
          <h5>{this.state.estudiante.apellido_paterno}</h5>
          <br/>
          <h2>Apellido Materno</h2>
          <h5>{this.state.estudiante.apellido_materno}</h5>
          <br/>
          <h2>Fecha Nacimiento</h2>
          <h5>{this.state.estudiante.dia_nacimiento}/{this.state.estudiante.mes_nacimiento}/{this.state.estudiante.año_nacimiento}</h5>
          <br/>
          <h2>Alergias</h2>
          <h5>{this.state.estudiante.alergias}</h5>
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
