import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';
import EvaluacionItem from './evaluacion_item.js';

export default class DetalleAplicacion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false,
      message: '',
      loading: true,
      aplicacion: {
        titulo: '',
        texto: '',
        estado: '',
        taller: '',
        evaluacion: '',
        estudiante: {
          id_estudiante: '',
          nombre: '',
          apellido_paterno: '',
          apellido_materno: ''
        }
      },
      evaluacion: []
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
    fetch('/api/aplicacion_talleres/detalle/' + this.props.match.params.id, {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then((res) => {
      if (!res.success) return this.setState({ loading: false, error: true, message: res.error});

      this.setState({ loading: false, success: true, aplicacion: res }, () => {
        var temp = aplicacion.evaluacion.split("|");
        console.log(temp);
        this.setState({ loading: false, success: true, evaluacionArreglo: temp });
      });
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
          <h2>Titulo</h2>
          <h5>{this.state.aplicacion.titulo}</h5>
          <br/>
          <h2>Estado</h2>
          <h5>{this.state.aplicacion.estado}</h5>
          <br/>
          <h2>Taller</h2>
          <h5>{this.state.aplicacion.taller}</h5>
          <br/>
          <h2>Estudiante</h2>
          <h5>{this.state.aplicacion.estudiante.nombre} {this.state.aplicacion.estudiante.apellido_paterno} {this.state.aplicacion.estudiante.apellido_materno}</h5>
          <br/>
          <h2>Evaluacion</h2>
          <center>
            {this.state.evaluacion.map((item:string,i:number)=><EvaluacionItem item={item} key={i}/>)}
          </center>
          <br/>
          <h2>Texto</h2>
          <h5>{this.state.aplicacion.texto}</h5>
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
