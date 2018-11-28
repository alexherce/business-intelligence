import React, { Component } from 'react';
import './navigation.css';


export default class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alumnos: [],
    };
  }

  render() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <a class="navbar-brand" href="#">Colegio Hispano Americano Octavio Paz</a>

              <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Calificaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Estado de cuenta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Aplicar a taller</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                  <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Cerrar sesion</button>
                </form>
              </div>
            </nav>
        </div>
    );
  }
}
