import React from "react";
import CounterControls from "./CounterControls";

export default class GameControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      digits: 5,
      bulls: 0,
      cows: 0
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
    let playerGuesses = e.target.dataset.playerGuesses;
    let digits = this.state.digits;
    this.props.onCreateGameClick(playerGuesses, digits);

    return false;
  }

  render() {
    if (this.props.gameStage === 'start') {
      return (
        <div className="game-controls">
          <a className="game-controls__button" href="#" data-player-guesses="true"
             onClick={ this.handleCreateGameClick }>Угадать</a>
          <CounterControls field="digits" fieldName="Цифр" value={ this.state.digits } 
            onCounterChange={ this.handleCounterChange } min={ 1 } max={ 10 }/>
          <a className="game-controls__button" href="#" data-player-guesses="false"
             onClick={ this.handleCreateGameClick }>Загадать</a>
        </div>
      );
    }
  }
}