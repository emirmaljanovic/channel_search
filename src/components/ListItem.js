import React from 'react';

const ListItem = ({ game: { name, box: { small } }, channelsNumber, viewers }) =>
  <li className="channel-item">
    <a
      className="App-link"
      href={`https://twitch.tv/directory/game/${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="channel-logo">
        <img src={small} alt="logo" />
      </div>
      <div className="content">
        <span className="channel-name" title={name}>{name}</span>
        <span className="channel-game" title={channelsNumber}>Channels: {channelsNumber}</span>
        <span className="channel-game" title={viewers}>Viewers: {viewers}</span>
      </div>
    </a>
  </li>;

export default ListItem;