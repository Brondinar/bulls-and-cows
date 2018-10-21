import React from 'react';

export default class HistoryRow extends React.Component {
  render() {
    return (
      <tr className="turn">
        <td className="turn__td turn__i">{ this.props.i }</td>
        <td className="turn__td turn__number">{ this.props.number }</td>
        <td className="turn__td turn__bulls">{ this.props.bulls }</td>
        <td className="turn__td turn__cows">{ this.props.cows }</td>
      </tr>
    );
  }
}
