import React, { Component } from 'react';
import './menu.css';

import NavigationAdmin from './navigationAdmin.js';

export default class RegistroEmpleado extends Component {
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

    fetch('/api/empleados/crear', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        "email": event.target.email.value,
        "nombre": event.target.nombre.value,
        "apellido_paterno": event.target.apellido_paterno.value,
        "apellido_materno": event.target.apellido_materno.value,
        "area": event.target.area.value,
        "posicion": event.target.posicion.value,
        "salario": event.target.salario.value,
        "password": event.target.password.value,
        "password_verify": event.target.password_verify.value,
        "telefono": event.target.telefono.value
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.success) return this.setState({ loading: false, success: true, message: 'Alumno creado'});
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
          <label for="email">Email</label>
          <br/>
          <input type="text" id="email" name="email" placeholder="Email.." required/>
          <br/>
          <label for="nombre">Nombre(s)</label>
          <br/>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre(s).." required/>
          <br/>
          <label for="apellido_paterno">Apellido Paterno</label>
          <br/>
          <input type="text" id="apellido_paterno" name="apellido_paterno" placeholder="Apellido Paterno.." required/>
          <br/>
          <label for="apellido_materno">Apellido Materno</label>
          <br/>
          <input type="text" id="apellido_materno" name="apellido_materno" placeholder="Apellido Materno.." required/>
          <br/>
          <label for="area">Area</label>
          <br/>
          <input type="text" id="area" name="area" placeholder="Area.." required/>
          <br/>
          <label for="posicion">Posición</label>
          <br/>
          <input type="text" id="posicion" name="posicion" placeholder="Posición.." required/>
          <br/>
          <label for="salario">Salario</label>
          <br/>
          <input type="text" id="salario" name="salario" placeholder="Salario.." required/>
          <br/>
          <label for="telefono">Teléfono</label>
          <br/>
          <input type="text" id="telefono" name="telefono" placeholder="Telefono.." required/>
          <br/>
          <label for="password">Contraseña</label>
          <br/>
          <input type="password" id="password" name="password" placeholder="Contraseña.." required/>
          <br/>
          <label for="password_verify">Confirmación de contraseña</label>
          <br/>
          <input type="password" id="password_verify" name="password_verify" placeholder="Confirmación de contraseña.." required/>
          <br/>
          <input type="submit" value="Enviar"/>
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
        <h2 className="text-center">Registro de empleado</h2>
        <div class="elementos">
          <div class="itemfullRegistro identificadorForm">
            <this.RenderContent/>
          </div>
        </div>
      </div>
    );
  }
}
