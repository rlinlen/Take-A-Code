import React from 'react';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

class ProjectItemAdminForm extends React.Component {
    constructor(props){
        super(props);

        this.required = value => (value ? undefined : 'Required')
        this.number = value => (value && !/^[0-9]*$/i.test(value)
                                ? 'Invalid Number!'
                                : undefined)
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };
  
    renderInput = ({ input, label, meta, id , placeholder, readonly}) => {
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
            {options.map(i => <option key={i.id} value={i.id}>{i.NAME}</option>)}
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

    renderFieldArray = ({ fields, meta }) => (
        <ul className="list-group">
            <label>{fields.name} </label>
          <li className="list-group-item">
            <button type="button" className="btn btn-info" onClick={() => fields.push({})}>
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
                name={`${member}.DICTIONARY_ID`}
                component={this.renderSelect}
                label={`#${index + 1} DICTIONARY`}
                options={this.props.options}
                validate={this.required}
              />
              <Field
                name={`${member}.SEQ`}
                component={this.renderNumber}
                label={`#${index + 1} SEQ`}
                min="1"
                validate={this.required}
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
                <label for="ProjectItemName">Name</label>
                <Field className="form-control" id="ProjectItemName" name="Name" component="input" type="text" placeholder="Input ProjectItem Name"/>
              </div> */}
              <Field name="PROJECT_ID" component={this.renderInput} label="PROJECT_ID" id="PROJECT_ID" validate={this.required} readonly={true}/>
              <Field name="PROJECT_NAME" component={this.renderInput} label="PROJECT_NAME" id="PROJECT_NAME" validate={this.required} readonly={true}/>

              <FieldArray name="Dictionaries" component={this.renderFieldArray}/>
              

              <button className="btn btn-primary" type="submit" disabled={submitting || pristine} >Submit</button>
              
            </form>
          )}
        />
      );
    }
}

export default ProjectItemAdminForm;