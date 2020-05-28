import React, { Component } from 'react';

class Application extends Component {
  render() {
    return (
      <div className='application'>
        <h2 className="appTitle">{this.props.title}</h2>

      </div>
    );
  }
}

export default Application;