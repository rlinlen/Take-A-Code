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
    //console.log(this.state.projItemDict)
    if (this.state.projItemDict && this.state.projItemDict.Dictionaries && this.verifyFill(this.props.dictValue, this.props.projItemId, this.state.projItemDict.Dictionaries.length)) {
      //avoid infinite loop
      
      //if previous is null (not set any dictionary)
      //console.log(prevProps.projItemId)
      /* if (!prevProps.dictValue[prevProps.projItemId])
        this.props.finishDictValue(this.props.projItemId)

      //if previous verifynull is 0
      if (Object.entries(prevProps.dictValue[prevProps.projItemId]).reduce((a,c) => a + +Number.isInteger(+c[0]),0) !== (this.state.projItemDict.Dictionaries.length))
          this.props.finishDictValue(this.props.projItemId) */
      if(!this.verifyFill(prevProps.dictValue, this.props.projItemId, this.state.projItemDict.Dictionaries.length))
        this.props.finishDictValue(this.props.projItemId)
    }
  }
  
  verifyFill(obj, id, dictNum){
    //must fill all the dictionary, plus one for generated code
    if (Object.entries(obj).length === 0 && obj.constructor === Object){
      return 0;
    }
    //undefined or {}
    if (!obj[id] || (Object.entries(obj[id]).length === 0 && obj[id].constructor === Object)){
      return 0;
    }

    //must fill all the dictionary, filter if the key is integer only to avoid other flag.
    if (Object.entries(obj[id]).reduce((a,c) => a + +Number.isInteger(+c[0]),0) === (dictNum)){
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
    if (!this.verifyFill(this.props.dictValue, id, dictNum)){
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
          {this.state.projItemDict.Dictionaries.sort((a,b) => a.SEQ - b.SEQ).map(i => <DictionaryCard 
            key={i.DICTIONARY_ID} 
            dictId={i.DICTIONARY_ID} 
            projItemId={this.props.projItemId} 
            dictSEQ={i.SEQ}
            projectItemRule={this.state.projItemDict.PROJECTITEM_RULE}/>) }
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