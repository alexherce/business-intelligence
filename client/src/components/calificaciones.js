import React, { Component } from 'react';
import './calificaciones.css';

import NavigationBar from './navigation.js';
import CalificacionesItem from './calificaciones_item.js';

export default class CalificacionesAlumno extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoEstudiante: {
        nombre: '',
        apellido_paterno: ''
      },
      loading: true,
      error: false,
      message: ''
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    fetch('/api/sesion/alumno')
    .then(res => res.json())
    .then((res) => {
      if (res) {
        if (!res.success) return this.props.history.push("/alumnos/login");

        this.setState({ infoEstudiante: res.infoEstudiante }, () => {
          console.log(this.state);

          this.getCalificaciones();
        });
      } else {
        this.props.history.push("/alumnos/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getCalificaciones = () => {
    fetch('/api/boletas/consultar/2018', {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then((res) => {
      if (!res.success) return this.setState({ loading: false, error: true, message: res.error});
      console.log(res);

      this.setState({ calificaciones: res.calificaciones, loading: false });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  Loading = () => {
    return(
      <div>
        <center><div className="loader"></div></center>
      </div>
    );
  }

  Table = () => {
    return(
      <div>
        <table className="table tableDiv">
          <thead>
            <tr>
              <th scope = "col" > Materia </th>
              <th scope = "col" > 1er trimestre </th>
              <th scope = "col" > 2do trimestre </th>
              <th scope = "col" > 3ro trimestre </th>
              <th scope = "col" > 4to trimestre </th>
              <th scope = "col" > FINAL </th>
            </tr>
          </thead>
          <tbody>
            {this.state.calificaciones.map((item:string,i:number)=><CalificacionesItem item={item} califs={JSON.parse(item.calificaciones)} key={i}/>)}
          </tbody>
        </table>
      </div>
    );
  }

  Error = () => {
    return(
      <div>
        <h3 className="text-danger text-center">{this.state.message}</h3>
      </div>
    );
  }

  RenderContent = () => {
    if (this.state.loading) return <this.Loading/>;
    if (this.state.error) return <this.Error/>;
    return <this.Table/>;
  }

  render() {
    return (
      <div>
        <NavigationBar/>
        <h2 className="alumnoName">{this.state.infoEstudiante.nombre} {this.state.infoEstudiante.apellido_paterno}</h2>
        <br/>
        <this.RenderContent/>
      </div>
    );
  }
}
