import { Component } from 'react';
import '../components/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div class="wrapper">
        <div class="pokeball" />          
        <div class="loading-message">
          Loading...
        </div>
      </div>
    );
  }
}