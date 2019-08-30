import React from 'react';
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

class ProjectAdminForm extends React.Component {
    constructor(props){
        super(props);

        this.init = {'NAME':'',ProjectItem:[]}
    }

    validate = (values) => {
      let errors = {};
      if(!values.NAME){
        errors.NAME = 'Required';
      }
      errors.ProjectItem = values.ProjectItem.map(i => i.SEQ ? undefined : 'Required SEQ');
        
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
          <input type="number" {...field} className="form-control" id={id} readOnly={readonly} min={min} max={max}/>
          <ErrorMessage name={field.name}>
            {errorMessage => <div className="text-danger">{errorMessage}</div>}
          </ErrorMessage>
        </div>
      );
    };

    renderFieldArray = ({ push, remove, form, name }) => (
      <ul className="list-group">
          <label>{name} </label>
        <li className="list-group-item">
          <button type="button" className="btn btn-info" onClick={() => push({Display:'', Value:''})}>
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
              name={`${name}.${index}.NAME`}
              component={this.renderText}
              label={`#${index + 1} NAME`}
              placeholder="Input NAME"
            />
            <Field
              name={`${name}.${index}.PROJECTITEM_RULE`}
              component={this.renderText}
              label={`#${index + 1} PROJECTITEM_RULE`}
              placeholder="Join Character, default '-'. Enter 'N' for no join character"
            />
            <Field
              name={`${name}.${index}.SEQ`}
              component={this.renderNumber}
              label={`#${index + 1} SEQ`}
              min="1"
            />
            <Field
              name={`${name}.${index}.id`}
              render={({ field, form }) => (
                <div>
                  {this.props.mode==='EDIT'? <Link to={`/admin/projItemDict/${field.value}`} className="btn btn-secondary">Manage ProjectItem Definition</Link> : <></>}
                </div>
              )}
            />
            <ErrorMessage name={`${name}.${index}`}>
              {errorMessage => <div className="text-danger">{errorMessage}</div>}
            </ErrorMessage>
          </li>
          )}) : <></>}
      </ul>
    )

    render() {
      return (
        <Formik
          initialValues={this.props.initialValues || this.init}  
          onSubmit={this.onSubmit}
          validate={this.validate}
          enableReinitialize={true}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <Field name="NAME" component={this.renderText} label="Name" id="projectName" placeholder="Input Project Name"/>
              <FieldArray name="ProjectItem" component={this.renderFieldArray}/>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
        />
      );
    }
}

export default ProjectAdminForm;