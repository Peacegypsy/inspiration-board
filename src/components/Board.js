import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./Board.css";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import CARD_DATA from "../data/card-data.json";

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: []
    };
  }
  populateCards = () => {
    return CARD_DATA["cards"].map(card => {
      return <Card id={card.id} text={card.text} emoji={card.emoji} />;
    });
  };

  render() {
    return (
      <div>
        <div>Board</div>
        <div>{this.populateCards()}</div>
      </div>
    );
  }
}

Board.propTypes = {};

export default Board;
