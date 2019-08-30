import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

class ProjectItemAdminForm extends React.Component {
    constructor(props){
        super(props);

        this.init = {}
    }

    validate = (values) => {
      let errors = {};
      if(!values.NAME){
        errors.NAME = 'Required';
      }
      errors.Dictionaries = values.Dictionaries.map(i => {
        if(!i.SEQ) return  'Required SEQ'
        if(!i.DICTIONARY_ID) return 'Required Dictionary'
        return undefined
      })
      return errors;
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
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
            {options.map(i => <option key={i.id} value={i.id}>{i.NAME}</option>)}
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
      console.log(form.values)
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <input type="number" {...field} className="form-control" id={id} readOnly={readonly} min={min} max={max}/>
          <ErrorMessage name={field.name}>
            {errorMessage => <div className="text-danger">{errorMessage}</div>}
          </ErrorMessage>
        </div>
      );
    };

    renderFieldArray = ({ push, remove, form, name  }) => (
        <ul className="list-group">
            <label>{name} </label>
          <li className="list-group-item">
            <button type="button" className="btn btn-info" onClick={() => push({})}>
              Add {name}
            </button>
          </li>
          {form.values[name] ? form.values[name].map((member, index) => {
          return (
            <li key={index} className="list-group-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(index)}>Remove {name}</button>
              <Field
                name={`${name}.${index}.DICTIONARY_ID`}
                component={this.renderSelect}
                label={`#${index + 1} DICTIONARY`}
                options={this.props.options}
              />
              <Field
                name={`${name}.${index}.SEQ`}
                component={this.renderNumber}
                label={`#${index + 1} SEQ`}
                min="1"
              />
              <ErrorMessage name={`${name}.${index}`}>
                {errorMessage => <div className="text-danger">{errorMessage}</div>}
              </ErrorMessage>
            </li>
          )}) : <></>}
          
        </ul>
      )

    render() {
      //console.log(this.props.initialValues)
      return (
        <Formik
          initialValues={this.props.initialValues || this.init}  
          onSubmit={this.onSubmit}
          validate={this.validate}
          enableReinitialize={true}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <Field name="PROJECTITEM_ID" component={this.renderText} label="PROJECTITEM_ID" id="PROJECTITEM_ID" readonly={true}/>
              <Field name="PROJECTITEM_NAME" component={this.renderText} label="PROJECTITEM_NAME" id="PROJECTITEM_NAME" readonly={true}/>

              <FieldArray name="Dictionaries" component={this.renderFieldArray}/>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
              </Form>
          )}
        />
      );
    }
}

export default ProjectItemAdminForm;