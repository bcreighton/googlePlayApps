import React, { Component } from 'react';
import Application from './components/application/Application'

class App extends Component {
  state = {
    apps: [],
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


  render() {
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
        {apps}
      </main>
    );
  }
}

export default App;