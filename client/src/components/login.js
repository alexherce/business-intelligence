import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
    return (
        <div class="login-background">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                        <div class="card-body">
                            <h5 class="card-title text-center">Inicio de sesión</h5>
                            <form class="form-signin">
                                <div class="form-label-group">
                                    <h4 class="titles">Matricula</h4>
                                    <input type="email" id="inputEmail" class="form-control" required autofocus/>

                                    </div>

                                <div class="form-label-group">
                                    <h4 class="titles" >Contraseña</h4>
                                    <input type="password" id="inputPassword" class="form-control" required/>
                                </div>

                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                    <label class="custom-control-label" for="customCheck1">Recordar contraseña</label>
                                </div>
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
