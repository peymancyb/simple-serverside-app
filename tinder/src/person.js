import React , {Component} from 'react';

class Person extends Component{
  constructor(){
    super();
    this.state = {
      person:[]
    };
  }

  getData(){
    fetch('/get-data')
    .then( (res) => res.json())
    .then( (person) => this.setState({person}))
    .catch( (err) => console.log(err));
  }

  render(){
    console.log(this.state.person);
    return(
      <div>
        <form action={'/send-data'} method={'post'}>
        <input type="text" name='name' placeholder='name'/>
        <br/>
        <input type="text" name='family' placeholder='family'/>
        <br/>
        <input type="text" name='age' placeholder='age'/>
        <br/>
        <input type="submit"/>
        </form>
        <div>
          <button onClick={this.getData.bind(this)}>get data</button>
        </div>
        <ul>
          {this.state.person.map(person=><li key={person._id}>{person.name} {person.family}</li>)}
        </ul>
      </div>
    );
  }
}

export default Person;
