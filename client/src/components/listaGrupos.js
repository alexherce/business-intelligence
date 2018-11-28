import React, { Component } from 'react';
import './calificaciones.css';

import NavigationAdmin from './navigationAdmin.js';
import GrupoItem from './grupo_item.js';

export default class ListaGrupos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false,
      message: '',
      loading: true,
      grupos: []
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
    fetch('/api/grupos/list', {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then((res) => {
      if (!res.success) return this.setState({ loading: false, error: true, message: res.error});

      this.setState({ loading: false, success: true, grupos: res.grupos });
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
        <center><a class="btn btn-success margenes" href="/admin/alumnos/grupos/nuevo/">Agregar Grupo</a></center>
        <br/>
        <table class="table">
          <thead>
            <tr>
              <th scope = "col" > ID </th>
              <th scope = "col" > Nivel </th>
              <th scope = "col" > Grado </th>
              <th scope = "col" > Grupo </th>
              <th scope = "col" > Año escolar </th>
              <th scope = "col" > Profesor </th>
              <th scope = "col" > Acciones </th>
            </tr>
          </thead>
          <tbody>
            {this.state.grupos.map((item:string,i:number)=><GrupoItem item={item} key={i}/>)}
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
    var nombre = "Lista de grupos";
    return (
      <div>
        <NavigationAdmin/>

        <h2 class="alumnoName" >{nombre}</h2>
        <br/>
        <div class="containerCuenta">
          <this.RenderContent/>
        </div>
      </div>
    );
  }
}
