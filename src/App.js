import React, { Component } from 'react';
import './App.css';

import List from './components/List';
import Loader from './components/Loader';

import { get, debounce } from './helpers/fetch';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _cursor: '',
      clips: [],
      searchTerm: '',
      period: 'all',
      dataLoaded: false,
      selectedChannel: '',
      dataSetLoading: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.fetchClips = debounce(this.fetchClips.bind(this), 500);
  }

  onInputChange(event) {
    let value = event.target.value;

    this.setState({ selectedChannel: value, _cursor: null, dataLoaded: false });
    this.fetchClips();
  }

  fetchClips() {
    const { selectedChannel, _cursor, period } = this.state;
    this.setState({ dataSetLoading: true });

    get({ url: `https://api.twitch.tv/kraken/clips/top?limit=50&cursor=${_cursor || ''}&channel=${selectedChannel}&period=${period}`})
      .then(({ clips, _cursor }) => {
        this.setState({
          _cursor,
          dataLoaded: true,
          dataSetLoading: false,
          clips: this.state._cursor === null ? clips || [] : [...this.state.clips, ...clips]
        })
      });
  }

  filterClips() {
    const { selectedChannel, clips } = this.state;

    return clips.filter(({ title }) =>  title.toLowerCase().includes(selectedChannel.toLowerCase()));
  }

  render() {
    const {
      clips,
      dataLoaded,
      selectedChannel,
      dataSetLoading
    } = this.state;

    let content = null;

    if (dataSetLoading && !dataLoaded) {
      content = <Loader />;
    } else if (clips.length) {
      content = <List clips={clips} onLastReached={this.fetchClips} />;
    } else if (!dataSetLoading && !clips.length && dataLoaded && selectedChannel !== '') {
      content = (
        <div className="no-data">
          <span>No clips found for channel</span>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="header">
          <h1>TW Clip Downloader</h1>
          <small>(Don't lose your content)</small>
        </header>
        <section className="filters">
          <input
            type="text"
            value={selectedChannel}
            name="selectedChannel"
            className="channel-search"
            onChange={this.onInputChange}
            placeholder="Search for a channel..."
          />
          { dataLoaded && clips.length ?
            <button
              disabled={true}
              className="download-button"
              onClick={this.bulkDownload}
            >
              Download all clips from this channel
            </button>
            : null
          }
        </section>
        {content}
      </div>
    );
  }
}

export default App;
