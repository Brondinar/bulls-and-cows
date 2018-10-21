import React from 'react';
import StringControl from './StringControl';

export default class InGameControls extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      number: '',
      numberValid: false
    };

    this.numberPattern = new RegExp(`^[0-9]{${ this.props.digits }}$`);
    this.handleSendAnswerClick = this.handleSendAnswerClick.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleNumberChange(number) {
    this.setState({
      number: number,
      numberValid: this.numberPattern.test(number)
    });
  }

  handleSendAnswerClick(e) {
    if (this.state.numberValid && !this.props.waiting) {
      this.setState({ 
        number: '',
        numberValid: false
      });
      
      this.props.onTryGuessClick(this.state.number);
    }
  }

  render() {
    let buttonClassNames = ['game-controls__button'];

    if (this.props.waiting || !this.state.numberValid) {
      buttonClassNames.push('game-controls__button_disabled');
    }

    return (
      <div className="game-controls game-controls_player">
        <StringControl value={ this.state.number } digits={ this.props.digits }
                       onStringChange={ this.handleNumberChange } onEnterPress={ this.handleSendAnswerClick } />
        <a className={ buttonClassNames.join(' ') } onClick={ this.handleSendAnswerClick }>Отправить</a>
      </div>
    )
  }
}