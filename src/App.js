import React from 'react';
import Header from './components/Header';
import Users from './components/Users';

export default class App extends React.Component {
    render(){
      return (
        <div className="App">
          <Header />
          <Users />
        </div>
      );
    }
}
