import React, { Component } from 'react';
import { fetchData, getRandomElementFromArray } from '../../helpers';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      word: ""
    }

    this.setWord(props.type);
  }

  setWord = async(type) => {
    // let host = "https://words.bernardus.co.za/";
    let host = "http://localhost:3000/data/data/";
    let url = "";
    switch (type) {
      case "noun" : 
        url = host+"words/nouns.json";
        break;
      case "verb" :
      case "verbed" :
      case "verbing" :
        url = host+"words/verbs.json";
        break;
      case "adj" : 
        url = host+"words/adjectives.json";
        break;
      case "mood" : 
        url = host+"humans/moods.json";
        break;
      case "occupation" : 
        url = host+"humans/occupations.json";
        break;
      default : 
        url = host+"words/nouns.json";
        break;
    }

    const array = await fetchData(url);
    //filter odd arrays
    switch (type) {
      case 'verb':
        array.verbs = array.verbs.map((v) => {
          return v.present;
        });
        break;
      case 'verbing':
        array.verbings = array.verbs.map((v) => {
          return v.continuous;
        });
        break;
      case 'verbed':
        array.verbeds = array.verbs.map((v) => {
          return v.past;
        });
        break;
      default:
    }

    let index = (this.props.type)+'s';
    console.log(index);
    const word = getRandomElementFromArray(array[index]);
    // console.log(word.substr(0,1));
    // this.props.firstLetter = word.substr(0,1);
    this.setState({word});
  }

  render() { 
    return ( 
      <span>
        {this.state.word} 
      </span>
    );
  }

  reset = () => {
    this.setWord(this.props.type);
  }

  componentDidMount() {
    if (this.props.reset) {
      this.setWord(this.props.type);
    }
  }

  getFirstLetter() {
    return this.state.word.substr(0,1);
  }
}
 
export default Word;