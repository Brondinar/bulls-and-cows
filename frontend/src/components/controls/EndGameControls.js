import React from 'react';
import CounterControls from './CounterControls';

export default class StartGameControls extends React.Component {
  constructor(props) {
    super(props);

    this.handleRestartGameClick = this.handleRestartGameClick.bind(this);
  }

  handleRestartGameClick(e) {
    this.props.onRestartGameClick();
  }

  render() {
    return (
      <div className="game-controls game-controls_end">
        <a className="game-controls__button"
          onClick={ this.handleRestartGameClick }>Выход</a>
      </div>
    );
  }
}
