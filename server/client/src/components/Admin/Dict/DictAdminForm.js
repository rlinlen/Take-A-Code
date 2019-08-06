import React from 'react';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

class DictAdminForm extends React.Component {
    constructor(props){
        super(props);

        this.required = value => (value ? undefined : 'Required')
        this.number = value => (value && !/^[0-9]*$/i.test(value)
                                ? 'Invalid Number!'
                                : undefined)
        this.dictType = [{value:'select',label:'select'},{value:'number',label:'number'},{value:'text',label:'text'},{value:'date',label:'date'}]
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };
  
    renderInput = ({ input, label, meta, id , placeholder}) => {
        return (
          <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input {...input} className="form-control" type="text" id={id} autoComplete="off" placeholder={placeholder}/>
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
            {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
          </select>
          {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
        </div>
      );
    };

    renderFieldArray = ({ fields, meta }) => (
        <ul className="list-group">
            <label>{fields.name} </label>
          <li className="list-group-item">
            <button type="button" className="btn btn-info" onClick={() => fields.push({Display:'', Value:''})}>
              Add {fields.name}
            </button>
          </li>
          {fields.map((member, index) => (
            <li key={index} className="list-group-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => fields.remove(index)}>Remove {member}</button>
              <Field
                name={`${member}.DISPLAY`}
                component={this.renderInput}
                label={`#${index + 1} Display`}
                placeholder="Input Display"
              />
              <Field
                name={`${member}.VALUE`}
                component={this.renderInput}
                label={`#${index + 1} Value`}
                placeholder="Input Value"
              />
            </li>
          ))}
        </ul>
      )

    render() {
      return (
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.props.initialValues}  
          mutators={{
            ...arrayMutators
          }}
          render={({ 
            handleSubmit, 
            form: {
              mutators: { push, pop }
            }, // injected from final-form-arrays above, 
            submitting, 
            pristine, 
            values }) => (
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <label for="DictName">Name</label>
                <Field className="form-control" id="DictName" name="Name" component="input" type="text" placeholder="Input Dict Name"/>
              </div> */}
              <Field name="NAME" component={this.renderInput} label="Name" id="dictName" placeholder="Input Dict Name" validate={this.required}/>
              <Field name="DICT_TYPE" component={this.renderSelect} label="DICT_TYPE" id="dictType" options={this.dictType} />
              

              <FieldArray name="DictionaryItem" component={this.renderFieldArray}/>
              

              <button className="btn btn-primary" type="submit" disabled={submitting || pristine} >Submit</button>
              
            </form>
          )}
        />
      );
    }
}

export default DictAdminForm;