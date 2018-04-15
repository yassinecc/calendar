import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import logo from './logo.svg';
import './App.css';
import { createUser } from './services/api';
import data from './data';

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
    return createUser(this.state.firstName, this.state.lastName)
      .then(() => console.log('OK'))
      .catch(error => console.log(error));
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
        <div className="App-intro">
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
        </div>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: 'First Name',
                accessor: 'firstName',
              },
              {
                Header: 'Last Name',
                accessor: 'lastName',
              },
              {
                Header: 'Rank',
                accessor: 'rank',
              },
              {
                Header: 'Project',
                accessor: 'project',
              },
              {
                Header: 'Project type',
                accessor: 'projectType',
              },
              {
                Header: 'Client',
                accessor: 'client',
              },
              {
                Header: 'Industry',
                accessor: 'industry',
              },
              {
                Header: 'Start date',
                accessor: 'startDate',
              },
              {
                Header: 'End date',
                accessor: 'endDate',
              },
              {
                Header: 'Intensity',
                accessor: 'intensity',
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
