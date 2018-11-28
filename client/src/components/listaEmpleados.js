import React, { Component } from 'react';
import './calificaciones.css';

import NavigationAdmin from './navigationAdmin.js';
import EmpleadoItem from './empleado_item.js';

export default class ListaEmpleados extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false,
      message: '',
      loading: true,
      empleados: []
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

        this.getDatos();
      } else {
        this.props.history.push("/admin/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getDatos = () => {
    fetch('/api/empleados/list', {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then((res) => {
      if (!res.success) return this.setState({ loading: false, error: true, message: res.error});

      this.setState({ loading: false, success: true, empleados: res.empleados });
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
        <table class="table">
          <thead>
            <tr>
              <th scope = "col" > ID </th>
              <th scope = "col" > Nombre </th>
              <th scope = "col" > Apellido Paterno </th>
              <th scope = "col" > Apellido Materno </th>
              <th scope = "col" > Posicion </th>
              <th scope = "col" > Accion </th>
            </tr>
          </thead>
          <tbody>
            {this.state.empleados.map((item:string,i:number)=><EmpleadoItem item={item} key={i}/>)}
          </tbody>
        </table>
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
        <h2 class="alumnoName" >Lista de Empleados</h2>
        <br/>
        <div class="containerCuenta">
          <this.RenderContent/>
        </div>
      </div>
    );
  }
}
