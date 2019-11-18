import React, { Component } from 'react';
import { fetchData, getRandomElementFromArray } from '../../helpers';

class Adjective extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      adjective: ""
     }

     this.setWord();
  }

  async setWord() {
    const array = await fetchData("https://words.bernardus.co.za/words/adjectives.json");
    const adjective = getRandomElementFromArray(array.adjs)
    this.setState({adjective});
  }

  render() { 
    return ( 
      <span>
        {this.state.adjective} 
      </span>
    );
  }

  reset = () => {
    this.setWord();
  }
}
 
export default Adjective;