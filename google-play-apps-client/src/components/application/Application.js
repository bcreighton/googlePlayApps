import React, { Component } from 'react';
import './Application.css';

class Application extends Component {
  render() {
    return (
      <div className='application'>
        <h2 className="appTitle">{this.props.title}</h2>
        <h3 className="appCategory">{this.props.category}</h3>
        <h3 className="appGenres">{this.props.genres}</h3>
        <h3 className="appRating">{this.props.rating}</h3>

        <p className="appReviews">{this.props.reviews}</p>
        <p className="appInstalls">{this.props.installs}</p>
        <h3 className="appPrice">{this.props.price}</h3>
        <h4 className="appContentRating">{this.props.contentRating}</h4>
        <p className="appUpdate">{this.props.update}</p>
        <p className="appVersion">{this.props.version}</p>
      </div>
    );
  }
}

export default Application;