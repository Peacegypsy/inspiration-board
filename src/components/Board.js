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

        this.setState({
          cards: cards,
          errorMessage: null
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
          addCardCallback={this.addCard}
        />
      );
    });
  };
  removeCard = cardID => {
    console.log(cardID);
    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardID}`);

    let deleteIndex = -1;
    const cards = [...this.state.cards];
    cards.forEach((card, index) => {
      if (cardID === card.id) {
        deleteIndex = index;
      }
    });
    cards.splice(deleteIndex, 1);
    this.setState({
      cards: cards
    });
  };

  addCard = newCard => {
    const apiPayload = {
      ...newCard
    };

    axios
      .post(
        ` https://inspiration-board.herokuapp.com/boards/Christina/cards`,
        apiPayload
      )
      // .post(URL, apiPayload)
      .then(response => {
        const { card } = response.data;

        console.log(response.data);

        // newCard.id = myNewCard.id;
        const { cards } = this.state;
        console.log("part two");
        cards.push(card);
        this.setState({
          cards,
          errorMessage: "card added"
        });
        console.log("adding new card");
      })
      .catch(error => {
        this.setState({
          errorMessage: `Failure ${error.message}`
        });
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
    return (
      <div className="board">
        {this.allCards()}
        <section>
          <NewCardForm addCardCallback={this.addCard} />{" "}
        </section>
      </div>
    );
  }
}

Board.propTypes = {
  cardList: PropTypes.array,
  removeCardCallback: PropTypes.func,
  addCardCallback: PropTypes.func
};

export default Board;
