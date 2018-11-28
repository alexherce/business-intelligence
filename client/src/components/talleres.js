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

  render() {

    return (
        <div>
            <NavigationBar/>

            <div class="containerTaller">
                <div class="itemTalleres">
                    <h3>Aplica a un taller</h3>
                    <div class="input-group marginTop">
                      <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Escoge el taller al que quieras aplicar...</option>
                        <option value="1">Taller 1</option>
                        <option value="2">Taller 2</option>
                        <option value="3">Taller 3</option>
                        <option value="4">Taller 4</option>
                        <option value="5">Taller 5</option>
                      </select>
                      <div class="input-group-append">
                        <button class="btn btn-outline-light" type="button">Button</button>
                      </div>
                    </div>
                    <br/>

                    <textarea class="form-control" rows="10"></textarea>

                    <button type="button" class="btn btn-outline-light marginTop">Aplicar</button>
                </div>
            </div>

        </div>
    );
  }
}
