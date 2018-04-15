import React, { Component } from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import logo from './logo.svg';
import './App.css';
import { createUser } from './services/api';
import data from './data';
import projects from './projects';
import users from './users';

moment.locale('fr');

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      startDate: moment('01/10/2017', 'DD-MM-YYYY'),
      endDate: moment('30/04/2018', 'DD-MM-YYYY'),
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

  renderDateHeader = () => (
    <div className="dateHeader">
      <div>{this.state.startDate}</div>
      <div>{this.state.endDate}</div>
    </div>
  );

  getTimeWidth = row => {
    const startDate = moment(row.value.startDate, 'DD-MM-YYYY');
    const endDate = moment(row.value.endDate, 'DD-MM-YYYY');
    const totalTime = this.state.endDate.diff(this.state.startDate, 'days');
    const timeWidth = Math.round(endDate.diff(startDate, 'days') / totalTime * 100);
    return `${timeWidth}%`;
  };

  getTimeBefore = row => {
    const startDate = moment(row.value.startDate, 'DD-MM-YYYY');
    const totalTime = this.state.endDate.diff(this.state.startDate, 'days');
    const timeWidth = Math.round(startDate.diff(this.state.startDate, 'days') / totalTime * 100);
    return `${timeWidth}%`;
  };

  getTimeAfter = row => {
    const endDate = moment(row.value.endDate, 'DD-MM-YYYY');
    const totalTime = this.state.endDate.diff(this.state.startDate, 'days');
    const timeWidth = Math.round(endDate.diff(this.state.startDate, 'days') / totalTime * 100);
    return `${timeWidth}%`;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Calendar demo</h1>
        </header>
        <div className="App-intro">
          {/* <form onSubmit={this.handleSubmit}>
            <label>
              Prénom:
              <input type="text" name="firstName" onChange={this.updateFirstName} />
            </label>
            <label>
              Nom:
              <input type="text" name="lastName" onChange={this.updateLastName} />
            </label>
            <input type="submit" value="Valider" />
          </form> */}
        </div>
        <div className="table">
          <ReactTable
            data={data}
            columns={[
              {
                Header: 'Name',
                accessor: 'userId',
                maxWidth: 150,
                Cell: row => `${users[row.value].firstName} ${users[row.value].lastName}`,
              },
              {
                Header: (
                  <div className="dateHeader">
                    <div>{this.state.startDate.format('DD/MM/YYYY')}</div>
                    <div>{this.state.endDate.format('DD/MM/YYYY')}</div>
                  </div>
                ),
                accessor: 'dates',
                Cell: row => (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '2px',
                    }}
                  >
                    <div
                      style={{
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        marginLeft: this.getTimeBefore(row),
                        width: this.getTimeWidth(row),
                        marginRight: this.getTimeAfter(row),
                        height: '100%',
                        backgroundColor: `rgba(133,204,0,${row.value.intensity / 100})`,
                        borderRadius: '2px',
                        transition: 'all .2s ease-out',
                      }}
                    >
                      {projects[row.value.projectID].project}
                    </div>
                  </div>
                ),
                minWidth: 500,
              },
            ]}
            defaultPageSize={15}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
