import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      message: '',
      loading: false
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
        if (res.success) return this.props.history.push("/");

      } else {
        this.props.history.push("/alumnos/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    fetch('/api/estudiantes/login', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        "id_estudiante": event.target.username.value,
        "password": event.target.password.value
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.success) return this.props.history.push("/");
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

  LoginForm = () => {
    return(
      <div>
        <form className="form-signin" onSubmit={this.handleLoginSubmit}>
          <div className="form-label-group">
            <h4 className="titles">CURP</h4>
            <input type="text" id="username" className="form-control" required autoFocus/>
          </div>

          <div className="form-label-group">
            <h4 className="titles">Contraseña</h4>
            <input type="text" id="password" className="form-control" required autoFocus/>
          </div>
          <br/>
          <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Entrar</button>
        </form>
        {this.state.error ? (
          <h5 className="text-danger text-center">{this.state.message}</h5>
        ) : null }
      </div>
    );
  }

  RenderContent = () => {
    if (this.state.loading) return <this.Loading/>;
    return <this.LoginForm/>;
  }

  render() {
    return (
      <div className="login-background">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Inicio de sesión</h5>
                  <this.RenderContent/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
