import React from 'react';
import HistoryRow from './HistoryRow';

export default class GameWindow extends React.Component {
  render() {
    if (!this.props.history) {
      return <div className="game-window"></div>
    }

    let history = [];

    this.props.history.forEach((turn, i) => {
      history.push(<HistoryRow key={ i } i={ i + 1 } number={ turn.number } bulls={ turn.bulls } cows={ turn.cows } />)
    });

    history = history.reverse();

    return (
      <div className="game-window">
        <table className="history">
          <thead>
            <tr>
              <th>Ход</th>
              <th>Число</th>
              <th>Быков</th>
              <th>Коров</th>
            </tr>
          </thead>
          <tbody>
            { history }
          </tbody>
        </table>
      </div>
    );
  }
}
