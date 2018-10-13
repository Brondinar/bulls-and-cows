import React from "react";

export default class CounterControls extends React.Component {
  constructor(props) {
    super(props);

    this.handleCounterChange = this.handleCounterChange.bind(this);
  }

  handleCounterChange(e) {
    let field = e.target.closest('.counter-control').dataset.field;
    let value = e.target.closest('div').dataset.nextValue;

    if (value < this.props.min || value > this.props.max) return;

    this.props.onCounterChange(field, value);
  }

  render() {
    return (
      <form className="counter-control" data-field={ this.props.field }>
        <label className="counter-control__label">{ this.props.fieldName }</label>
        <div className="input">
          <div onClick={ this.handleCounterChange } className="input__left"
            data-next-value={ +this.props.value - 1}>
            <span className="fas fa-angle-left"></span>
          </div>
          <div className="input-value"><span className="input-value__span">{ this.props.value }</span></div>
          <div onClick={ this.handleCounterChange } className="input__right"
            data-next-value={ +this.props.value + 1}>
            <span className="fas fa-angle-right"></span>
          </div>
        </div>
      </form>
    );
  }
}