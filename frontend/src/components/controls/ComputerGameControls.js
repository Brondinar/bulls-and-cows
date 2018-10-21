import React from 'react';
import CounterControls from './CounterControls';

export default class ComputerGameControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bulls: 0,
      cows: 0
    }

    this.handleCounterChange = this.handleCounterChange.bind(this);
    this.handleSendAnswerClick = this.handleSendAnswerClick.bind(this);
  }

  handleCounterChange(field, value) {
    let obj = {};
    obj[field] = value;
    this.setState(obj);
  }

  handleSendAnswerClick(e) {
    if (this.props.waiting) return;

    this.setState({
      bulls: 0,
      cows: 0
    });

    this.props.onSendAnswerClick(this.state.bulls, this.state.cows);
  }

  render() {
    let buttonClassNames = ['game-controls__button'];

    if (this.props.waiting) {
      buttonClassNames.push('game-controls__button_disabled');
    }

    return (
      <div className="game-controls game-controls_computer">
        <CounterControls field="bulls" fieldName="Быков" value={ this.state.bulls }
          onCounterChange={ this.handleCounterChange } min={ 0 } max={ this.props.digits - this.state.cows } />
        <CounterControls field="cows" fieldName="Коров" value={ this.state.cows }
          onCounterChange={ this.handleCounterChange } min={ 0 } max={ this.props.digits - this.state.bulls } />
        <a className={ buttonClassNames.join(' ') } href="#"
          onClick={ this.handleSendAnswerClick }>Отправить</a>
      </div>
    )
  }
}
