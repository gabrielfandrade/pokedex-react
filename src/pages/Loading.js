import React from 'react';
import '../components/Loading.css';

function Loading() {
  return (
    <div className="wrapper">
      <div className="pokeball" />          
      <div className="loading-message">
        Loading...
      </div>
    </div>
  );
}

export default Loading;
