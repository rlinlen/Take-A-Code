import React from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form'

import DictionaryCard from './DictionaryCard'

class DictionaryCards extends React.Component {

  constructor(props){
    super(props);
    this.state = { projItemDict:{} };
  }

  componentDidMount(){
    this.fetchData(this.props.projItemId);
  } 

  fetchData = (projectItemId) => {
    axios.get(`/api/projItemDict/${projectItemId}`).then(
        res => {
            console.log(res.data)
            this.setState({projItemDict: res.data})
        }
    );
  }

  render(){
    if ( (Object.entries(this.state.projItemDict).length === 0 && this.state.projItemDict.constructor === Object)) {
      return <div>Loading...</div>;
    }

    return (
      <div className="card-group">
        {this.state.projItemDict.Dictionaries.map(i => <DictionaryCard key={i.DICTIONARY_ID} dictId={i.DICTIONARY_ID}/>) }
      </div>
    );
  }
  
};

export default DictionaryCards;