import React, { Component } from 'react';
import './App.css';

import List from './components/List';

import { get } from './helpers/fetch';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      maxViewers: 1,
      maxChannels: 1,
      topChannel: {},
      directories: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    get({ url: 'https://api.twitch.tv/kraken/games/top?limit=100'})
      .then(({ top, _total }) => {
        const directories = top.sort((a, b) => a.channels < b.channels ? 0 : -1);
        const [ topChannel ] = directories;

        this.setState({
          directories,
          topChannel,
          maxChannels: topChannel.channels,
          maxViewers: topChannel.viewers,
        })
      });
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

  filterDirectories() {
    const { searchTerm, maxChannels, maxViewers } = this.state;

    return this.state.directories.filter(({ channels, game: { name }, viewers }) => {
      return channels <= maxChannels
        && name.toLowerCase().includes(searchTerm.toLowerCase())
        && viewers <= maxViewers;
    });
  }

  render() {
    const { searchTerm, maxChannels, maxViewers } = this.state;

    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
