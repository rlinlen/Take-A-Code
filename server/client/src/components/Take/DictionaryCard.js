import React from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form'


class DictionaryCard extends React.Component {

  constructor(props){
    super(props);
    this.state = { dict:{} };
  }

  componentDidMount(){
    this.fetchData(this.props.dictId);
  } 

  fetchData = (dictId) => {
    axios.get(`/api/dict/${dictId}`).then(
        res => {
            console.log(res.data)
            this.setState({dict: res.data})
        }
    );
  }

  onSubmit= (values) => {
    console.log(values);
  }

  renderText = ({ input, label, meta, id , placeholder, readonly}) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input {...input} className="form-control" type="text" id={id} autoComplete="off" placeholder={placeholder} readOnly={readonly}/>
        {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
      </div>
    );
};

  renderSelect = ({ input, label, meta, id , placeholder, readonly, options}) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select {...input} className="form-control" id={id} autoComplete="off" readOnly={readonly}>
          <option>----</option>
          {options.map(i => <option key={i.id} value={i.VALUE}>{i.DISPLAY}</option>)}
        </select>
        {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
      </div>
    );
  };

  renderNumber = ({ input, label, meta, id , placeholder, readonly, min, max}) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input {...input} className="form-control" type="number" id={id} autoComplete="off" readOnly={readonly} min={min} max={max}/>
        {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
      </div>
    );
  };

  renderInput = () => {
    switch(this.state.dict.DICT_TYPE) {
      case 'select':
        return <Field name="item" component={this.renderSelect} id="PROJECTITEM_ID" validate={this.required} options={this.state.dict.DictionaryItem}/>
      case 'number':
        return <Field name="item" component={this.renderNumber} id="PROJECTITEM_ID" validate={this.required}/>
      case 'text':
        return <Field name="item" component={this.renderText} id="PROJECTITEM_ID" validate={this.required}/>
      default:
        return <div>Unidentified field!</div>
    }
  }

  
  render(){
    if ( (Object.entries(this.state.dict).length === 0 && this.state.dict.constructor === Object)) {
      return <div>Loading...</div>;
    }
    
    return (
      <div className="card border-success mb-3" style={{"maxWidth": "18rem"}}>
          <div className="card-header bg-transparent border-success">{this.state.dict.NAME}</div>
          <Form
              onSubmit={this.onSubmit}
              render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                  <div className="card-body text-success">
                      {/* <h5 class="card-title">Success card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                      {this.renderInput()}
                  </div>
              </form>)}
          />
          
          <div className="card-footer bg-transparent border-success">{this.state.dict.DICT_TYPE}</div>
      </div>
    );
  }
  
};

export default DictionaryCard;