import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./Board.css";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import CARD_DATA from "../data/card-data.json";

const URL = "https://inspiration-board.herokuapp.com/boards/Christina/cards";

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cardList: []
    };
  }
  // populateCards = () => {
  //   return CARD_DATA["cards"].map(card => {
  //     return <Card id={card.id} text={card.text} emoji={card.emoji} />;
  //   });
  // };
  componentDidMount() {
    axios.get(URL).then(response => {
      const cards = response.data.map(card => {
        return <Card text={card.text} emoji={card.emoji} />;
      });
    });
  }
  render() {
    return (
      <div>
        <div>Board</div>
        <div>{this.cardList}</div>
      </div>
    );
  }
}

Board.propTypes = {};

export default Board;
