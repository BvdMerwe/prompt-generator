import React, { Component } from 'react';

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "SkillName",
      description: "This is a description",
      descriptors: [
        "descriptor1", "descriptor2"
      ],
      templates: [
        "Template"
      ],
      words: []
    }
  }
  
  render() {
    return ( 
      <span>
        {this.state.words.map(word => (
          
        ))}
      </span>
    );
  }
  
  componentDidMount() {
    
  }

}

export default Skill;