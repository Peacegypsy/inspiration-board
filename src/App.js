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
          console.log("step two-", newBoard);
          return newBoard;
        });

        // const { board } = this.boards.map((board, i) => {
        //     return (<Board key={i} name={board.name} id={board.id} />
        //   )
        // boards.push(board);
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

    var select = document.getElementById("chooseNumber");
    var options = this.state.boards;
    console.log(this.state.boards);
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }

  // allBoards = () => {
  //   return this.boards.map((board, i) => {
  //     return <Board key={i} name={board.name} id={board.id} />;
  //   });
  // };

  // boardsDropdownList = () => {
  //   console.log("made it here");
  //   const boards = this.state.boards;
  //   //   console.log(this.board);
  //   return boards.map((name, i) => {
  //     return (
  //       <option value={name} key={i}>
  //         {this.board.name}
  //       </option>
  //     );
  //   });
  // };

  render() {
    return (
      <section>
        <header className="header">
          <h1 className="header__h1">
            <span className="header__text">Inspiration Board</span>
          </h1>
        </header>

        <div>
          <select id="chooseNumber">
            <option>Choose a board</option>
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
