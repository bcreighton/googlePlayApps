import React, { Component } from 'react';
import Application from './components/application/Application'

class App extends Component {
  state = {
    applications: [],
    sort: '',
    genres: '',
    error: null,
  }

  setSort(sort) {
    this.setState({
      sort,
    })
  }

  setGenres(genres) {
    this.setState({
      genres,
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    //construct URL with query string
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];

    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }

    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }

    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    //api request
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })

      .then(data => {
        this.setState({
          applications: data,
          error: null, //reset all errors
        })
      })

      .catch(err => {
        this.setState({
          error: `Sorry, apps cannot be retrieved at this time`
        })
      })
  }


  render() {
    // map over all apps
    const applications = this.state.applications.map((applicaiton, i) => {
      return <Application {...application} key={i} />
    })

    return (
      <main className="app">
        <h1>Google Play App Search</h1>

        <div className="search">
          <form
            id="searchForm"
            onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="sort">Sort: </label>
            <select
              name="sort"
              id="sort"
              onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="Rating">Rating</option>
              <option value="App">App</option>
            </select>

            <label htmlFor="genres">Genres: </label>
            <select
              name="genres"
              id="genres"
              onChange={e => this.setGenres(e.target.value)}>
              <option value="">None</option>
              <option value="Action">Action</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Strategy">Strategy</option>
              <option value="Casual">Casual</option>
              <option value="Arcade">Arcade</option>
              <option value="Card">Card</option>
            </select>

            <button id="submit" type="submit">Search</button>
          </form>

          <div className="error">{this.state.error}</div>
        </div>
        {applications}
      </main>
    );
  }
}

export default App;