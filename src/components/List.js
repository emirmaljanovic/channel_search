import React, { Component } from 'react';
import ListItem from './ListItem';

export default class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      limit: 80
    };

    this.getData = this.getData.bind(this);
    this.onListScroll = this.onListScroll.bind(this);
  }

  /**
   * On new props received, which is in case of filtering/searching,
   * we reset the list to the top, so we don't automatically request
   * multiple pages.
   */
  componentWillReceiveProps() {
    document.querySelector('.list-wrapper').scrollTop = 0;
    this.setState({ limit: 80 });
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
      this.setState({ limit: this.state.limit + 80 });
    }
  }

  /**
   * Takes directories from props,
   * slices the array to set page (limit, offset),
   * and maps it out to <List> components.
   * 
   * Note: Artificial pagination for DOM performance's sake.
   */
  getData() {
    return (this.props.directories || [])
      .slice(0, this.state.limit)
      .map(({ channels, viewers, game }, index) =>
      <ListItem key={`channel-${viewers}-${index}`} game={game} channelsNumber={channels} viewers={viewers} />
    );
  }

  render() {
    const list = this.getData();
  
    return (
      <div className="list-wrapper" onScroll={this.onListScroll}>
        <ul className="channel-list">
          {list}
        </ul>
      </div>
    )
  }
}