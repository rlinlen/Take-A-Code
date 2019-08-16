import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import {setDictValue} from '../../actions';

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

  onSubmit= (values, actions) =>{
    //console.log(values);
  }

  handleInputChange = (e, form) => {
    e.persist();
    const { setFieldValue } = form;
    const { name, value } = e.target;
    //console.log(e);
    setFieldValue(name, e.target.value);

    //console.log(this.props.projItemId + ',' + this.props.dictId + ',' + e.target.value)
    this.props.setDictValue(this.props.projItemId, this.props.dictSEQ, this.props.dictId, e.target.value, this.state.dict.DICT_TYPE, this.state.dict.DICT_RULE, this.state.dict.DICT_CURRENT);
  }

  renderText = ({
    field, // { name, value, onChange, onBlur }
    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    readonly,
    id,
    placeholder,
    ...props
  }) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input type="text" {...field} className="form-control" id={id} autoComplete="off" placeholder={placeholder} readOnly={readonly} onChange={e => this.handleInputChange(e, form)}/>
        <ErrorMessage name={field.name}>
          {errorMessage => <div className="text-danger">{errorMessage}</div>}
        </ErrorMessage>
      </div>
    );
};

  renderSelect = ({
    field, // { name, value, onChange, onBlur }
    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    readonly,
    id,
    options,
    ...props
  }) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select {...field} className="form-control" id={id} autoComplete="off" onChange={e => this.handleInputChange(e, form)}>
          <option>----</option>
          {options.map(i => <option key={i.id} value={i.VALUE}>{i.DISPLAY}</option>)}
        </select>
        <ErrorMessage name={field.name}>
          {errorMessage => <div className="text-danger">{errorMessage}</div>}
        </ErrorMessage>
      </div>
    );
  };

  renderNumber = ({
    field, // { name, value, onChange, onBlur }
    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    readonly,
    id,
    min,
    max,
    ...props
  }) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input type="number" {...field} className="form-control" id={id} readOnly={readonly} min={min} max={max} onChange={e => this.handleInputChange(e, form)}/>
        <ErrorMessage name={field.name}>
          {errorMessage => <div className="text-danger">{errorMessage}</div>}
        </ErrorMessage>
      </div>
    );
  };

  renderInput = () => {
    switch(this.state.dict.DICT_TYPE) {
      case 'select':
        return <Field name="item" component={this.renderSelect} id="PROJECTITEM_ID" options={this.state.dict.DictionaryItem || 0} />
      case 'number':
        return (
          <>
            <Field type="text" readOnly={true} className="form-control" value={this.state.dict.DICT_CURRENT || 0}/>
            <Field name="item" component={this.renderNumber} id="PROJECTITEM_ID" min={1}/>
          </>
        )
      case 'text':
        return <Field name="item" component={this.renderText} id="PROJECTITEM_ID" />
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
          <Formik
              initialValues={{item:""}}
              onSubmit={this.onSubmit}
              render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="card-body text-success">
                    {/* <h5 class="card-title">Success card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    {this.renderInput()}
                </div>
              </Form>)}
          />
          
          <div className="card-footer bg-transparent border-success">Type: {this.state.dict.DICT_TYPE}</div>
          <div className="card-footer bg-transparent border-success">Rule: {this.state.dict.DICT_RULE}</div>
      </div>
    );
  }
  
};


export default connect(null,{setDictValue})(DictionaryCard);