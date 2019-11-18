import React, { Component } from 'react';
import './homescreen.scss';
import Word from '../words/Word';
import { fetchData, random } from '../../helpers';

class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      words: {

      },
      skills: [],
      selectedSkill: {},
      generated: ["Select what you would like to do and hit Go!"],
      template: ["Loading..."]
    }
  }
  render() { 
    return ( 
      <div className="homescreen">

        <h1>What do you want to do?</h1>

        <select onChange={this.selectSkill}>
          <option key={'none'} value={'none'}>Anything!</option>
          {this.state.skills.map(skill => (
            <option key={skill.name} value={skill.name}>{skill.description}</option>
          ))}
        </select>
        <button onClick={this.reset}>Go!</button>

        {/* <p> 
          Compose a song about <Word type="noun"/> for a 
          <Word type="adj"/> 
          <Word type="mood"/> 
          <Word type="occupation"/>. 
        </p> */}

        <p> {this.state.generated} </p>
      </div>
     );
  }

  selectSkill = (e) => {
    if (e.target.value === "none") {
      this.setState({ selectedSkill: {}}, () => {setTimeout(this.populateTemplate(), 500)});
      return;
    }
    let selectedSkill = this.state.skills.filter(s => {
        if (s.name === e.target.value)
          return s;
        return null;
      })[0];
    this.setState({ selectedSkill: selectedSkill}, () => {setTimeout(this.populateTemplate(), 500)});
    // this.populateTemplate();
  }

  populateTemplate = async() => {
    let odds = 5;
    if (random(0, odds).toFixed() === random(0, odds).toFixed()) {
      this.setState({generated: "Do Nothing" });
      return;
    }
    let skill = this.state.selectedSkill;
    let noSkill = false;
    if (!skill.templates) {
      noSkill = true;
      await this.randomSkill();
      skill = this.state.selectedSkill;
    }

    this.setState({ generated: [] }, () => {
  
      let rand = random(0, this.state.selectedSkill.templates.length-1).toFixed();
      let template = this.state.selectedSkill.templates[rand].split('*');
  
      template = template.map(t => {
        switch (t) {
          case 'descriptor' : return skill.descriptors[random(0, skill.descriptors.length-1).toFixed()];
          case 'noun': 
          case 'verb': 
          case 'verbing': 
          case 'verbed': 
          case 'adj' :
          case 'mood' :
          case 'occupation' :  
            return <Word type={t} reset={true}/>;
          default:
            return t;
        }
        
      });
      
      this.setState({generated: template }, () => {
        // this.state.generated.fixSyntax();
      });
      if (noSkill) {
        this.setState({selectedSkill: {} })
      }
    });
  }

  randomSkill = async() => {
    let skills = this.state.skills = await fetchData("/data/skills.json");
    this.setState({ skills }, () => {
      //select random skill
      let rand = random(0, this.state.skills.length-1).toFixed();
      let selectedSkill = this.state.skills[rand];
      this.setState({ selectedSkill: selectedSkill});
    });
  }

  reset = () => {
    this.populateTemplate();
  }


  async componentDidMount() {
    let skills = this.state.skills = await fetchData("/data/skills.json");
    this.setState({ skills });
  }
}
 
export default Homescreen;