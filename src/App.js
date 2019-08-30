import React, { Component, Fragment } from 'react';
import './App.css';

import List from './components/List';
import Loader from './components/Loader';

import { get } from './helpers/fetch';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      searchTerm: '',
      maxViewers: 1,
      maxChannels: 1,
      topChannel: {},
      directories: [],
      dataSetLoading: true
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.fetchDirectories = this.fetchDirectories.bind(this);
  }

  componentWillMount() {
    this.fetchDirectories();
  }

  componentDidUpdate() {
    if (this.state.offset <= 500) {
      this.fetchDirectories();
    }
  }

  onInputChange(event) {
    const { topChannel } = this.state;
    const key = event.target.name;
    let value = event.target.value;

    if (key === 'maxChannels' && value === '') {
      value = topChannel.channels;
    } else if (key === 'maxViewers' && value === '') {
      value = topChannel.viewers;
    }

    this.setState({ [key]: value });
  }

  fetchDirectories() {
    get({ url: `https://api.twitch.tv/kraken/games/top?limit=100&offset=${this.state.offset}`})
      .then(({ top, _total }) => {
        let directories = [...this.state.directories, ...top];
        directories = directories.sort((a, b) => a.channels < b.channels ? 0 : -1);
        const [ topChannel ] = directories;

        this.setState({
          directories,
          topChannel,
          offset: this.state.offset + 100,
          maxChannels: topChannel.channels,
          maxViewers: topChannel.viewers,
          dataSetLoading: this.state.offset !== 500
        })
      });
  }

  filterDirectories() {
    const { searchTerm, maxChannels, maxViewers } = this.state;

    return this.state.directories.filter(({ channels, game: { name }, viewers }) => {
      return channels <= maxChannels
        && name.toLowerCase().includes(searchTerm.toLowerCase())
        && viewers <= maxViewers;
    });
  }

  render() {
    const { searchTerm, maxChannels, maxViewers, dataSetLoading } = this.state;

    return (
      <div className="App">
        { dataSetLoading ?
          <Loader />
          :
          <Fragment>
            <section className="filters">
              <div className="input-group">
                <span>Search:</span>
                <input
                  type="text"
                  name="searchTerm"
                  value={searchTerm}
                  onChange={this.onInputChange}
                />
              </div>
              <div className="input-group">
                <span>Max channels {maxChannels}</span>
                <input
                  type="number"
                  name="maxChannels"
                  value={maxChannels}
                  onChange={this.onInputChange}
                />
              </div>
              <div className="input-group">
                <span>Max viewers</span>
                <input
                  type="number"
                  name="maxViewers"
                  value={maxViewers}
                  onChange={this.onInputChange}
                />
              </div>
            </section>
            <List directories={this.filterDirectories()} />
          </Fragment>
        }
      </div>
    );
  }
}

export default App;
