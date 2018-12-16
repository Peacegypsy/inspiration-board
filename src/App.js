import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: []
    };
  }
  componentDidMount() {
    axios
      .get(`https://inspiration-board.herokuapp.com/boards`)
      .then(response => {
        console.log("step one- getting boards", response.data);
        const boards = response.data.map(board => {
          const newBoard = {
            ...board.board
          };
          console.log("step two- map boards");
          return newBoard;
        });
        this.setState({
          boards: boards,
          errorMessage: null
        });
      })
      .catch(error => {
        console.log("somewhere is an error");
        console.log(error.message);
        this.setState({ errorMessage: error.message });
      });
  }
  allBoards = () => {
    console.log(this.state);
    return this.state.boards.map((board, i) => {
      return <Board key={i} name={board.name} id={board.id} />;
    });
  };

  boardsDropdownList = () => {
    console.log(this.allBoards());
    const boards = [""].concat(this.boards);
    console.log(this.board);
    return boards.map((board, i) => {
      return (
        <option value={board.name} key={i}>
          {this.board.board}
        </option>
      );
    });
  };

  render() {
    return (
      <section>
        <header className="header">
          <h1 className="header__h1">
            <span className="header__text">Inspiration Board</span>
          </h1>
        </header>
        <div>
          Choose a Board
          <label className="new-board-form__label" htmlFor="board" />
          <select name="board" placeholder="board" value={this.state.board}>
            {this.boardsDropdownList()}
          </select>
        </div>

        <Board
        // url="https://inspiration-board.herokuapp.com/boards/"
        // boardName={`Christina`}
        />
      </section>
    );
  }
}

export default App;
