import React, { Component } from 'react';
import ListItem from './ListItem';

export default class List extends Component {

  constructor(props) {
    super(props);
  
    this.onListScroll = this.onListScroll.bind(this);
  }

  /**
   * 
   * @param {Object} event
   * 
   * When scroll reaches bottom of the element, we increase the limit of
   * list items to be displayed.
   */
  onListScroll(event) {
    if (event.target.scrollHeight - (event.target.scrollTop + event.target.offsetHeight) <= 50) {
      this.props.onLastReached();
    }
  }

  render() {
    const list = (this.props.clips || [])
    .map(({ title, slug, url, views, game, created_at, curator, thumbnails: { small } }) =>
    <ListItem
      key={`clip-${slug}`}
      url={url}
      title={title}
      game={game}
      views={views}
      curator={curator}
      thumbnail={small}
      createdAt={created_at}
    />
  );
  
    return (
      <div className="list-wrapper" onScroll={this.onListScroll}>
        <ul className="list">
          {list}
        </ul>
      </div>
    )
  }
}