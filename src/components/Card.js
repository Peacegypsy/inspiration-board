import React, { Component } from "react";
import PropTypes from "prop-types";
import emoji from "emoji-dictionary";

import "./Card.css";

class Card extends Component {
  render() {
    return (
      <div className="card" key={this.props.id}>
        <p>{this.props.text}</p>
        <p>{this.props.emoji} </p>
        <p>{}</p>
        <p />
        Card
      </div>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  id: PropTypes.number.isRequired
};

export default Card;
