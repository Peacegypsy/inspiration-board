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
      cards: []
    };
  }

  // populateCards = () => {
  //   return CARD_DATA["cards"].map(card => {
  //     return <Card id={card.id} text={card.text} emoji={card.emoji} />;
  //   });
  // };
  //****************
  componentDidMount() {
    axios
      .get(URL)
      .then(response => {
        const cards = response.data.map(card => {
          const newCard = {
            ...card.card
          };
          return newCard;
        });
        console.log("in cDM part");
        this.setState({
          cards: cards
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ errorMessage: error.message });
      });
  }
  allCards = () => {
    return this.state.cards.map(card => {
      return <Card text={card.text} id={card.id} emoji={card.emoji} />;
    });
  };
  // componentDidMount() {
  //   axios.get(URL).then(response => {
  //     console.log("inside component", response.data);
  //     const cardList = response.data.map((card, i) => {
  //       return <Card text={card.text} emoji={card.emoji} id={i} />;
  //     });
  //     // .catch(error => {
  //     //   console.log("error somewhere");
  //     //   this.setState({ error: error.message });
  //     // });
  //     return cardList;
  //   });

  render() {
    return <div>{this.allCards()}</div>;
  }
}

Board.propTypes = {};

export default Board;
