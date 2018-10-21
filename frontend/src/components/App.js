import React from 'react';
import ReactDOM from 'react-dom';
import GameHeader from './GameHeader';
import GameWindow from './GameWindow';
import StartGameControls from './controls/StartGameControls';
import PlayerGameControls from './controls/PlayerGameControls';
import ComputerGameControls from './controls/ComputerGameControls';
import EndGameControls from './controls/EndGameControls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      mode: '',
      stage: 'start',
      history: '',
      turn: 'player',
      digits: 0,
      header: 'Выберите режим игры',
      number: '',
      waiting: false
    }

    this.handleCreateGameClick = this.handleCreateGameClick.bind(this);
    this.handleRestartGameClick = this.handleRestartGameClick.bind(this);
    this.handleTryGuessClick = this.handleTryGuessClick.bind(this);
    this.handleSendAnswerClick = this.handleSendAnswerClick.bind(this);
  }

  handleCreateGameClick(playerGuesses, digits) {
    this.setState({
      header: 'Подождите...',
      waiting: true
    });

    fetch('api/create_game/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'player_guesses': playerGuesses === 'true',
        'digits': +digits
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return this.setState({
        key: data.key,
        mode: data.player_guesses ? 1 : 2,
        stage: 'in-game',
        digits: +digits,
        turn: data.player_guesses ? 'player' : 'computer',
        header: data.player_guesses ? 'Ваш ход' : 'Подождите...',
        waiting: !data.player_guesses
      });
    }).then(() => {
      if (this.state.mode === 2) {
        return this._getComputerTry(this.state.key);
      }
    });
  }

  _getComputerTry(key) {
    fetch('api/get_computer_try/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'key': key
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.number) {
        this.setState({
          number: data.number,
          header: 'Думаю, это ' + data.number
        });
      } else {
        this.setState({
          stage: 'end',
          header: 'В ваших ответах ошибка, конец игры'
        });
      }

      this.setState({
        waiting: false
      });
    });
  }

  handleSendAnswerClick(bulls, cows) {
    this.setState({
      header: 'Думаю...',
      waiting: true
    });

    fetch('api/send_answer/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'key': this.state.key,
        'number': this.state.number,
        'bulls': +bulls,
        'cows': +cows
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      return this.setState({
        stage: data.history[data.history.length - 1]['winner'] ? 'end' : 'in-game',
        history: data.history,
        header: data.history[data.history.length - 1]['winner'] ? 'Конец игры' : 'Думаю...'
      })
    }).then(() => {
      if (this.state.stage === 'in-game') {
        return this._getComputerTry(this.state.key);
      } else {
        this.setState({
          waiting: false
        });
      }
    });
  }

  handleRestartGameClick() {
    this.setState({
      stage: 'start',
      history: '',
      header: 'Выберите режим игры'
    });
  }

  handleTryGuessClick(number) {
    this.setState({
      header: 'Подождите...',
      waiting: true
    });

    fetch('api/try_to_guess/', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'key': this.state.key,
        'number': number
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        stage: data.history[data.history.length - 1]['winner'] ? 'end' : 'in-game',
        history: data.history,
        header: data.history[data.history.length - 1]['winner'] ? 'Конец игры' : 'Ваш ход',
        waiting: false
      });
    });
  }

  render() {
    let { stage, mode, waiting } = this.state;
    let controls;

    if (stage === 'start') {
      controls = <StartGameControls waiting={ waiting } onCreateGameClick={ this.handleCreateGameClick } />;
    } else if (stage === 'in-game') {
      if (mode === 1) {
        controls = <PlayerGameControls digits={ this.state.digits } waiting={ waiting }
          onTryGuessClick={ this.handleTryGuessClick }/>;
      } else {
        controls = <ComputerGameControls digits={ this.state.digits } waiting={ waiting }
          onSendAnswerClick={ this.handleSendAnswerClick } />
      }
    } else {
      controls = <EndGameControls onRestartGameClick={ this.handleRestartGameClick } />
    }

    return (
      <div className="game">
        <GameHeader value={ this.state.header } />
        <GameWindow history={ this.state.history } />
        { controls }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
