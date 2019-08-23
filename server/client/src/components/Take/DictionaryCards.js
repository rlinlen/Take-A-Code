import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import DictionaryCard from './DictionaryCard'
import {finishDictValue} from '../../actions'

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
            //console.log(res.data)
            this.setState({projItemDict: res.data})
        }
    );
  }

  componentDidUpdate(prevProps){
    //if all field is filled in a projectitem
    if (this.verifyFill(this.props.projItemId, this.state.projItemDict.Dictionaries.length)) {
      //console.log(Object.entries(prevProps.dictValue[id]).reduce((a,c) => a + +Number.isInteger(+c[0]),0) !== (dictNum))
      //if previous verifynull is 0 -> avoid infinite loop
      if (Object.entries(prevProps.dictValue[prevProps.projItemId]).reduce((a,c) => a + +Number.isInteger(+c[0]),0) !== (this.state.projItemDict.Dictionaries.length))
        this.props.finishDictValue(this.props.projItemId)
    }
  }
  
  verifyFill(id, dictNum){
    //must fill all the dictionary, plus one for generated code
    if (Object.entries(this.props.dictValue).length === 0 && this.props.dictValue.constructor === Object){
      return 0;
    }
    //undefined or {}
    if (!this.props.dictValue[id] || (Object.entries(this.props.dictValue[id]).length === 0 && this.props.dictValue[id].constructor === Object)){
      return 0;
    }

    //must fill all the dictionary, filter if the key is integer only to avoid other flag.
    if (Object.entries(this.props.dictValue[id]).reduce((a,c) => a + +Number.isInteger(+c[0]),0) === (dictNum)){
      return 1;
    }

    return 0;

  }

  renderGenCode(id, dictNum){
    /* if (Object.entries(this.props.dictValue).length === 0 && this.props.dictValue.constructor === Object){
        return <></>;
    }

    //undefined or {}
    if (!this.props.dictValue[id] || (Object.entries(this.props.dictValue[id]).length === 0 && this.props.dictValue[id].constructor === Object)){
        return <></>;
    }

    //must fill all the dictionary, plus one for generated code
    if (Object.entries(this.props.dictValue[id]).length !== (dictNum + 1)){
      return <></>;
    } */
    if (!this.verifyFill(id, dictNum)){
      return <></>;
    }

    return (
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
        <div className="card-deck">
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

export default connect(mapStateToProps, {finishDictValue})(DictionaryCards);