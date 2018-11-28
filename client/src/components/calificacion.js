import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class RegistroCalificacion extends Component {
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

    fetch('/api/boletas/crear', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        "id_estudiante": this.props.match.params.id,
        "id_materia": event.target.materia.value,
        "id_trimestre": event.target.trimestre.value,
        "calificacion": event.target.calificacion.value
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.success) return this.setState({ loading: false, success: true, message: 'Calificacion Añadida!'});
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
          <label for="materia">ID Materia</label>
          <br/>
          <input type="text" id="materia" name="materia" placeholder="ID materia.." required/>
          <br/>
          <label for="trimestre">ID trimestre</label>
          <br/>
          <input type="text" id="trimestre" name="trimestre" placeholder="ID trimestre.." required/>
          <br/>
          <label for="calificacion">Calificación</label>
          <br/>
          <input type="text" id="calificacion" name="calificacion" placeholder="Calificación.." required/>
          <br/>
          <input type="submit" value="Agregar Calificacion"/>
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
        <h2 className="text-center">Agregar Nueva Calificacion</h2>
        <div class="elementos">
          <div class="itemfullRegistro identificadorForm">
            <this.RenderContent/>
          </div>
        </div>
      </div>
    );
  }
}
