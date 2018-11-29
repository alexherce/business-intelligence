import React, { Component } from 'react';
import './talleres.css';

import NavigationBar from './navigation.js';

export default class AplicacionTalleres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
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
        });
      } else {
        this.props.history.push("/alumnos/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    fetch('/api/aplicacion_talleres/crear', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        "texto": event.target.texto.value,
        "id_taller": event.target.taller.value,
        "id_estudiante": this.state.infoEstudiante.id_estudiante,
        "titulo": event.target.titulo.value
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.success) return this.setState({ loading: false, success: true, message: 'Aplicacion Enviada!'});
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
        <form onSubmit={this.handleSubmit}>
          <label for="titulo">Titulo</label>
          <input type="text" id="titulo" name="titulo" placeholder="Titulo.." required/>
          <br/>
          <div class="input-group marginTop">
            <select class="custom-select" id="taller">
              <option selected>Escoge el taller al que quieras aplicar...</option>
              <option value="3">Taller de Escritura</option>
              <option value="4">Taller de Matematicas</option>
            </select>
          </div>
          <br/>
          <textarea class="form-control" id="texto" rows="20"></textarea>
          <button type="button" class="btn btn-outline-light marginTop">Aplicar</button>
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
        <NavigationBar/>

        <div class="containerTaller">
          <div class="itemTalleres">
            <h3>Aplica a un taller</h3>
            <this.RenderContent/>
          </div>
        </div>
      </div>
    );
  }
}
