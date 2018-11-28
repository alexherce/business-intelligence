import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class DetalleEmpleado extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false,
      message: '',
      loading: true,
      empleado: {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        posicion: '',
        salario: '',
        telefono: ''
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
    fetch('/api/empleados/detalle/' + this.props.match.params.id, {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then((res) => {
      if (!res.success) return this.setState({ loading: false, error: true, message: res.error});

      this.setState({ loading: false, success: true, empleado: res });
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
          <h2>Email</h2>
          <h5>{this.state.empleado.email}</h5>
          <br/>
          <h2>Nombre(s)</h2>
          <h5>{this.state.empleado.nombre}</h5>
          <br/>
          <h2>Apellido Paterno</h2>
          <h5>{this.state.empleado.apellido_paterno}</h5>
          <br/>
          <h2>Apellido Materno</h2>
          <h5>{this.state.empleado.apellido_materno}</h5>
          <br/>
          <h2>Posición</h2>
          <h5>{this.state.empleado.posicion}</h5>
          <br/>
          <h2>Salario</h2>
          <h5>{this.state.empleado.salario}</h5>
          <br/>
          <h2>Telefono</h2>
          <h5>{this.state.empleado.telefono}</h5>
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
