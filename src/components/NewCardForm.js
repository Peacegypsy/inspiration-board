import React, { Component } from "react";
import PropTypes from "prop-types";
import emoji from "emoji-dictionary";
import "./NewCardForm.css";

// const EMOJI_LIST = [
//   { label: null, href: null },
//   { label: "heart_eyes", href: "#" },
//   { label: "beer", href: "#" },
//   "clap",
//   "sparkling_heart",
//   "heart_eyes_cat",
//   "dog"
// ];

class NewCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      emoji: "",
      board: ""
    };
  }

  resetState = () => {
    this.setState({
      text: "",
      emoji: "",
      board: ""
    });
  };

  onFormChange = event => {
    const field = event.target.name;
    const value = event.target.value;
    console.log("in form change yay");
    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  };

  emojiDropdownList = () => {
    const emojis = [""].concat(emoji.names);
    return emojis.map((emojiname, i) => {
      return (
        <option value={emojiname} key={i}>
          {emoji.getUnicode(emojiname)}
        </option>
      );
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { text, emoji } = this.state;
    console.log("in on submit area1");
    if (text === "" || emoji === "") {
      console.log("here i am");
      return;
    }

    console.log("here");
    this.props.addCardCallback(this.state);
    this.resetState();
    console.log("in on submit area2");
  };

  // emoDropbutton = () => {
  //   document.getElementById("emoDropbutton").className.toggle("show");
  // };
  //
  // onButtonClick = event => {
  //   event.preventDefault();
  //   console.log("in on CLICK event");
  //   const { show } = this.state;
  //
  //   this.props.emoDropbuttonCallback(this.state);
  //   if (!event.target.matches("dropbtn")) {
  //     let dropdowns = document.getElementById("dropdown-content");
  //     let i;
  //     console.log("in CLICK event 2");
  //     for (i = 0; i < dropdowns.length; i++) {
  //       const openDropdown = dropdowns[i];
  //       if (openDropdown.className.contains("show")) {
  //         openDropdown.className.remove("show");
  //       }
  //     }
  //   }
  // };

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        name="new-card-form"
        id="new-card-form"
        className="new-card-form"
      >
        <div>
          <header className="new-card-form--header" htmlFor="Card">
            Add a card:
          </header>
          <textarea
            className="new-card-form__form-textarea"
            name="text"
            placeholder="text"
            onChange={this.onFormChange}
            value={this.state.text}
          />
        </div>

        <div>
          <label className="new-card-form__label" htmlFor="emoji">
            Emoji
          </label>
          <select
            name="emoji"
            placeholder="emoji"
            value={this.state.emoji}
            onChange={this.onFormChange}
          >
            {this.emojiDropdownList()}
          </select>
        </div>
        <input
          className="btn btn-success new-card-form--submit"
          type="submit"
          name="submit"
          value="Add a card"
        />
      </form>
    );
  }
}
NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired
};

export default NewCardForm;
