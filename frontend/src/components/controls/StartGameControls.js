import React from 'react';
import CounterControls from './CounterControls';

export default class StartGameControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      digits: 5
    }

    this.handleCreateGameClick = this.handleCreateGameClick.bind(this);
    this.handleCounterChange = this.handleCounterChange.bind(this);
  }

  handleCounterChange(field, value) {
    let obj = {};
    obj[field] = value;
    this.setState(obj);
  }

  handleCreateGameClick(e) {
    if (this.props.waiting) return;

    let playerGuesses = e.target.dataset.playerGuesses;
    let digits = this.state.digits;
    this.props.onCreateGameClick(playerGuesses, digits);
  }

  render() {
    let buttonClassNames = ['game-controls__button'];

    if (this.props.waiting) {
      buttonClassNames.push('game-controls__button_disabled');
    }

    return (
      <div className="game-controls game-controls_start">
        <a className={ buttonClassNames.join(' ') } data-player-guesses="true"
          onClick={ this.handleCreateGameClick }>Угадать</a>
        <CounterControls field="digits" fieldName="Цифр" value={ this.state.digits }
          onCounterChange={ this.handleCounterChange } min={ 1 } max={ 10 }/>
        <a className={ buttonClassNames.join(' ') } data-player-guesses="false"
          onClick={ this.handleCreateGameClick }>Загадать</a>
      </div>
    );
  }
}
