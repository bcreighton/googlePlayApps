import React, { Component } from 'react';
import './Application.css';

class Application extends Component {
  render() {
    return (
      <div className='application'>
        <h2 className="appTitle">{this.props.App}</h2>
        <h3 className="appCategory">{this.props.Category}</h3>
        <h3 className="appGenres">{this.props.Genres}</h3>
        <h3 className="appRating">{this.props.Rating}</h3>

        <p className="appReviews">{this.props.Reviews}</p>
        <p className="appInstalls">{this.props.Installs}</p>
        <h3 className="appPrice">${this.props.Price}</h3>
        <h4 className="appContentRating">{this.props['Content Rating']}</h4>
        <p className="appUpdate">{this.props['Last Updated']}</p>
        <p className="appVersion">{this.props['Current Ver']}</p>
      </div>
    );
  }
}

export default Application;