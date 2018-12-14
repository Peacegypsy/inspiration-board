import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./Board.css";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
// import CARD_DATA from "../data/card-data.json";

const URL = "https://inspiration-board.herokuapp.com/boards/Christina/cards";

class Board extends Component {
  constructor(props) {
    super(props);

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
    return this.state.cards.map((card, i) => {
      return (
        <Card
          key={i}
          text={card.text}
          id={card.id}
          emoji={card.emoji}
          removeCardCallback={this.removeCard}
        />
      );
    });
  };
  removeCard = cardID => {
    let deleteIndex = -1;
    const cards = [...this.state.cardList];
    cards.forEach((card, index) => {
      if (cardID === card.id) {
        deleteIndex = index;
      }
    });
    cards.splice(deleteIndex, 1);
    this.setState({
      cardList: cards
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
    return <div className="board">{this.allCards()} </div>;
  }
}

Board.propTypes = {
  cardList: PropTypes.array,
  removeCardCallback: PropTypes.func
};

export default Board;
