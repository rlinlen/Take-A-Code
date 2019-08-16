import React from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import {connect} from 'react-redux';

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

  renderGenCode(id, dictNum){
    if (Object.entries(this.props.dictValue).length === 0 && this.props.dictValue.constructor === Object){
        return <></>;
    }

    //undefined or {}
    if (!this.props.dictValue[id] || (Object.entries(this.props.dictValue[id]).length === 0 && this.props.dictValue[id].constructor === Object)){
        return <></>;
    }

    //must fill all the dictionary, plus one for generated code
    if (Object.entries(this.props.dictValue[id]).length !== (dictNum + 1)){
      return <></>;
    }

    //console.log(this.props.dictValue);
    //console.log(Object.entries(this.props.dictValue[id]).sort((a, b) => a[1].seq > b[1].seq));
    return (
        //get value
        //{[projectItemId]:
        //{[dictId]:{
         //   seq:seq,
          //  value:value
       // }}
    //}

    //<p>{Object.entries(this.props.dictValue[id]).sort((a, b) => a[1].seq - b[1].seq).map(i => i[1].value).join('-')}</p>
        //ASC
        <div>
            <h4>Generated Code Preview:</h4>
            <p>{this.props.dictValue[id].code}</p>
        </div>
        
    )
}

  render(){
    if ( (Object.entries(this.state.projItemDict).length === 0 && this.state.projItemDict.constructor === Object)) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className="card-group">
          {this.state.projItemDict.Dictionaries.sort((a,b) => a.SEQ - b.SEQ).map(i => <DictionaryCard key={i.DICTIONARY_ID} dictId={i.DICTIONARY_ID} projItemId={this.props.projItemId} dictSEQ={i.SEQ}/>) }
        </div>
        <div>
          {this.renderGenCode(this.props.projItemId, this.state.projItemDict.Dictionaries.length)}
        </div>
      </>
    );
  }
  
};

const mapStateToProps = (state) => {
  return { dictValue: state.dictValue };
};

export default connect(mapStateToProps)(DictionaryCards);