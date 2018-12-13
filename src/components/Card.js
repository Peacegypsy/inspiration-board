import React, { Component } from "react";
import PropTypes from "prop-types";
import emoji from "emoji-dictionary";

import "./Card.css";

class Card extends Component {
  render() {
    return (
      <div className="card" key={this.props.id}>
        <p className="card__content">
          {this.props.text}
          <p className="card__content-emoji">
            {this.props.emoji && (
              <p>
                {emoji.getUnicode(this.props.emoji)
                  ? emoji.getUnicode(this.props.emoji)
                  : this.props.emoji}
              </p>
            )}
          </p>
        </p>
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
