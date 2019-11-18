import React, { Component } from 'react';
class Includes extends Component {
  state =  {
    nouns: [],
    adjectives: []
  }

  async getDataFetch() {
    let nounCall =
      await fetch("https://words.bernardus.co.za/words/nouns.json",
        { headers: { 'Content-Type': 'application/json' } }
      );
    let nounRes = await nounCall.json();
    this.state.nouns = nounRes.nouns;
    let adjCall =
      await fetch("https://words.bernardus.co.za/words/adjectives.json",
        { headers: { 'Content-Type': 'application/json' } }
      );
    let adjRes = await adjCall.json();
    this.state.adjectives = adjRes.adjectives
    // console.log(nounRes.nouns);
    // console.log(adjRes.adjs);
  }


  random(mn, mx) {
    return Math.random() * (mx - mn) + mn;
  }
  getRandomElementFromArray(array) {
    let rand = this.random(0, array.length);

    return array[rand];
  }
  
  getRandomNoun() {
    let rand = this.random(0, this.nouns.length);

    return this.nouns[rand];
  }
  
  getRandomAdj() {
    let rand = this.random(0, this.adjectives.length);

    return this.adjectives[rand];
  }

  constructor(props) {
    super(props);
    this.getDataFetch();
  }
}

export default Includes;
// let