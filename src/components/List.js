import React, { Component } from 'react';

import ListItem from './ListItem';

export default class List extends Component {

  render() {
    const list = (this.props.directories || []).map(({ channels, viewers, game }, index) =>
      <ListItem key={`channel-${viewers}-${index}`} game={game} channelsNumber={channels} viewers={viewers} />
    );
  
    return (
      <div className="list-wrapper">
        <ul className="channel-list">
          {list}
        </ul>
      </div>
    )
  }
}