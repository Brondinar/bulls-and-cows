import React from "react";

export default class GameHeader extends React.Component {
  render() {
    return (
      <div className="game-header">
        <p>{ this.props.value }</p>
      </div>
    );
  }
}