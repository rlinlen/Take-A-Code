import React from 'react';
import { Form, Field } from 'react-final-form'

class ProjectAdminForm extends React.Component {
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
  
    renderInput = ({ input, label, meta, id , placeholder}) => {
        return (
          <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input {...input} className="form-control" type="text" id={id} autoComplete="off" placeholder={placeholder}/>
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
              name={`${member}.PROJECTITEM_RULE`}
              component={this.renderInput}
              label={`#${index + 1} PROJECTITEM_RULE`}
              placeholder="Input PROJECTITEM_RULE"
            />
            <Field
              name={`${member}.SEQ`}
              component={this.renderNumber}
              label={`#${index + 1} Value`}
              min="1"
              validate={this.required}
            />
            //Link to projItemDict!
            <Link to={`/admin/projItemDict/${this.props.match.params.id}`} className="btn btn-secondary">Manage ProjectItem Definition</Link>
          </li>
        ))}
      </ul>
    )

    render() {
      return (
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.props.initialValues}  
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <label for="projectName">Name</label>
                <Field className="form-control" id="projectName" name="Name" component="input" type="text" placeholder="Input Project Name"/>
              </div> */}
              <Field name="NAME" component={this.renderInput} label="Name" id="projectName" placeholder="Input Project Name" validate={this.required}/>

              <FieldArray name="ProjectItem" component={this.renderFieldArray}/>

              <button className="btn btn-primary" type="submit" disabled={submitting || pristine} >Submit</button>
              
            </form>
          )}
        />
      );
    }
}

export default ProjectAdminForm;