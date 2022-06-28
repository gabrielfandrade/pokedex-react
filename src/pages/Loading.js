import { Component } from 'react';
import '../components/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="pokeball" />          
        <div className="loading-message">
          Loading...
        </div>
      </div>
    );
  }
}