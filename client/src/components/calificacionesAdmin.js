import React, { Component } from 'react';
import './calificaciones.css';

import NavigationAdmin from './navigationAdmin.js';
import CalificacionesItemAdmin from './calificaciones_item_admin.js';

export default class CalificacionesAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoEmpleado: {
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
    fetch('/api/sesion/empleado')
    .then(res => res.json())
    .then((res) => {
      if (res) {
        if (!res.success) return this.props.history.push("/admin/login");

        this.setState({ infoEmpleado: res.infoEmpleado }, () => {
          console.log(this.state);

          this.getCalificaciones();
        });
      } else {
        this.props.history.push("/admin/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getCalificaciones = () => {
    fetch('/api/boletas/id/' + this.props.match.params.id, {
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
        <center><a class="btn btn-success margenes" href={'/admin/alumnos/calificaciones/nuevo/' + this.props.match.params.id}>Agregar Calificacion</a></center>
        <br/>
        <table className="table tableDiv">
          <thead>
            <tr>
              <th scope = "col" > ID Materia </th>
              <th scope = "col" > Materia </th>
              <th scope = "col" > Año Escolar </th>
              <th scope = "col" > 1er trimestre </th>
              <th scope = "col" > 2do trimestre </th>
              <th scope = "col" > 3ro trimestre </th>
              <th scope = "col" > 4to trimestre </th>
              <th scope = "col" > FINAL </th>
            </tr>
          </thead>
          <tbody>
            {this.state.calificaciones.map((item:string,i:number)=><CalificacionesItemAdmin item={item} califs={JSON.parse(item.calificaciones)} key={i}/>)}
          </tbody>
        </table>
        <br/>
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
        <NavigationAdmin/>
        <h2 className="alumnoName">Calificaciones de alumno: {this.props.match.params.id}</h2>
        <br/>
        <this.RenderContent/>
      </div>
    );
  }
}
