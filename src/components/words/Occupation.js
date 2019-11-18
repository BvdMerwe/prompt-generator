import React, { Component } from 'react';
import { fetchData, getRandomElementFromArray } from '../../helpers';

class Occupation extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      noun: ""
    }

    this.setWord();
  }

  async setWord() {
    const array = await fetchData("https://words.bernardus.co.za/humans/occupations.json");
    const noun = getRandomElementFromArray(array.occupations)
    this.setState({noun});
  }

  render() { 
    return ( 
      <span>
        {this.state.noun} 
      </span>
    );
  }

  reset = () => {
    this.setWord();
  }

  
}
 
export default Occupation;