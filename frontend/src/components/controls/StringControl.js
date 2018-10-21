import React from 'react';

export default class StringControl extends React.Component {
  constructor(props) {
    super(props);

    this.handleStringChange = this.handleStringChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleStringChange(e) {
    let value = e.target.value;

    this.props.onStringChange(value);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onEnterPress(e);
    }
  }

  render() {
    return (
      <form className="string-control">
        <label className="string-control__label" htmlFor="number">Число</label>
        <input className="string-control__input" name="number" type="text" value={ this.props.value }
          onChange={ this.handleStringChange } onKeyPress={ this.handleKeyPress }
          maxLength={ this.props.digits } style={{ width: this.props.digits * 13 + 'px' }}
          autoFocus />
      </form>
    );
  }
}
