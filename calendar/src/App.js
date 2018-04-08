import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createUser } from './services/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    return createUser(this.state.firstName, this.state.lastName);
  };

  updateFirstName = event => {
    this.setState({ firstName: event.target.value });
  };
  updateLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <label>
              Prénom:
              <input type="text" name="firstName" onChange={this.updateFirstName} />
            </label>
            <label>
              Nom:
              <input type="text" name="lastName" onChange={this.updateLastName} />
            </label>
            <input type="submit" value="Valider" />
          </form>
        </p>
      </div>
    );
  }
}

export default App;
