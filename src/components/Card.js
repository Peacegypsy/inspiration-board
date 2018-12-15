import React, { Component } from "react";
import PropTypes from "prop-types";
import emoji from "emoji-dictionary";

import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      emoji: ""
    };
  }

  render() {
    return (
      <div className="card" key={this.props.id}>
        <p className="card__content">
          {this.props.text}
          <div className="card__content-emoji">
            {this.props.emoji && (
              <p>
                {emoji.getUnicode(this.props.emoji)
                  ? emoji.getUnicode(this.props.emoji)
                  : this.props.emoji}
              </p>
            )}
            <button
              className="card__content-btn"
              onClick={() => {
                this.props.removeCardCallback(this.props.id);
              }}
              type="button"
              aria-label="Close"
            >
              Delete Card<span aria-hidden="false">&times;</span>
            </button>
          </div>
        </p>
      </div>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string,
  id: PropTypes.number.isRequired,
  removeCardCallback: PropTypes.func,
  addCardCallback: PropTypes.func
};

export default Card;
