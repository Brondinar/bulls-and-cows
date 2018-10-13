import React from "react";
import ReactDOM from "react-dom";
// import DataProvider from "./DataProvider";
import GameHeader from './GameHeader';
import GameWindow from "./GameWindow";
import GameControls from "./GameControls";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMode: '',
      gameStage: 'start'
    }
  }

  handleCreateGameClick(playerGuesses, digits) {
    console.log(digits);
    fetch('api/create_game/', {
      method: 'POST',
      headers: new Headers({
          "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        'player_guesses': playerGuesses === 'true',
        'digits': +digits
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    });

    return false;
  }

  render() {
    let header;

    if (this.state.gameStage === 'start') {
      header = 'Выберите режим игры';
    }

    // let header = 'Выберите режим игры';

    return (
      <div className="game">
        <GameHeader value={ header } />
        <GameWindow gameMode={ this.state.gameMode } gameStage={ this.state.gameStage } />
        <GameControls gameMode={ this.state.gameMode } gameStage={ this.state.gameStage } 
          onCreateGameClick={ this.handleCreateGameClick }/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));