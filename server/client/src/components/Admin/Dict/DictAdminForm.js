import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

class DictAdminForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { isLoading: false };
/*         this.required = value => (value ? undefined : 'Required')
        this.number = value => (value && !/^[0-9]*$/i.test(value)
                                ? 'Invalid Number!'
                                : undefined) */
        this.init = {NAME:'',DICT_TYPE:'',DICT_RULE:'',DICT_CURRENT:'',DictionaryItem:[]}
        this.dictType = [{value:'select',label:'select'},{value:'number',label:'number'},{value:'text',label:'text'},{value:'date',label:'date'}]
    }

    validate = (values) => {
      let errors = {};
      /* if (!values.upn) {
        errors.upn = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.upn)) {
        errors.upn = 'Invalid email address';
      }
      if (!values.name)
        errors.name = 'Required'; */
      // ...
      return errors;
    };

    onSubmit = formValues => {
      this.setState({isLoading:true}, 
        ()=>{this.props.onSubmit(formValues);})
    };
  
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
          <input type="text" {...field} className="form-control" id={id} autoComplete="off" placeholder={placeholder} readOnly={readonly}/>
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
          <select {...field} className="form-control" id={id} autoComplete="off">
            <option>----</option>
            {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
          </select>
          <ErrorMessage name={field.name}>
            {errorMessage => <div className="text-danger">{errorMessage}</div>}
          </ErrorMessage>
        </div>
      );
    };

    renderFieldArray = ({ push, remove, form, name }) => {
      //console.log(form)
      //console.log(name)
      return(
        <ul className="list-group">
          <label>{name}</label>
        <li className="list-group-item">
          <button type="button" className="btn btn-info" onClick={() => push({DISPLAY:'', VALUE:''})}>
            Add {name}
          </button>
        </li>
        {form.values[name] ? form.values[name].map((member, index) => {
          //console.log(member)
          return (
            <li key={index} className="list-group-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(index)}>Remove {name}</button>
              <Field
                name={`${name}.${index}.DISPLAY`}
                type="text"
                component={this.renderText}
                label={`DISPLAY #${index + 1}`}
              />
              <Field
                name={`${name}.${index}.VALUE`}
                type="text"
                component={this.renderText}
                label={`VALUE #${index + 1}`}
              />
            </li>
          )}) : <></>}
      </ul>
      )
    }
/* 
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
      ) */

    render() {
      return (
        <Formik
          initialValues={this.props.initialValues || this.init}  
          onSubmit={this.onSubmit}
          validate={this.validate}
          enableReinitialize={true}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <Field name="NAME" component={this.renderText} label="Name" id="dictName" placeholder="Input Dict Name" validate={this.required}/>
              <Field name="DICT_TYPE" component={this.renderSelect} label="DICT_TYPE" id="dictType" options={this.dictType} />
              <Field name="DICT_RULE" component={this.renderText} label="DICT_RULE" id="dictRule" placeholder="Number: Padding Digit, Text: Fix Text, Date:Format Order by D/M/Y" />
              <Field name="DICT_CURRENT" component={this.renderText} label="DICT_CURRENT" id="dictCurrent" readonly={true} />
              <FieldArray name="DictionaryItem" component={this.renderFieldArray}/>
              <button type="submit" className="btn btn-primary" disabled={this.state.isLoading}>Submit</button>
            </Form>
          )}
        />
      );
    }
}

export default DictAdminForm;