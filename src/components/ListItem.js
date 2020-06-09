import React from 'react';

const ListItem = ({ title, url, views, game, createdAt, curator, thumbnail }) =>
  <li className="list-item">
    <img className="clip-logo" src={thumbnail} alt="logo" />
    <div className="item-part">
      <span className="item-big-text" title={title}>
        {title}
      </span>
      <span className="item-dim-text" title={views}>Views: {views}</span>
      <span className="item-dim-text" title={game}>
        Category: {game}
      </span>
    </div>
    <div className="item-part">
      <span className="item-dim-text" title={title}>
        Curator: {curator.display_name}
      </span>
      <a
        target="_blank"
        className="item-dim-text"
        href={curator.channel_url}
        rel="noopener noreferrer"
      >
        Open curator channel
      </a>
      <span className="item-dim-text" title={createdAt}>
        Created at: {createdAt}
      </span>
    </div>
    <div className="item-part">
      <a
        href={`${thumbnail.split('-preview')[0]}.mp4`}
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        Download video
      </a>
      <span></span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open video
      </a>
    </div>
  </li>;

export default ListItem;