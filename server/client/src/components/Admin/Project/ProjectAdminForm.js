import React from 'react';
import { Form, Field } from 'react-final-form'
import {connect} from 'react-redux';

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
            <label for={id}>{label}</label>
            <input {...input} className="form-control" type="text" id={id} autoComplete="off" placeholder={placeholder}/>
            {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
          </div>
        );
    };

    render() {
      return (
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <label for="projectName">Name</label>
                <Field className="form-control" id="projectName" name="Name" component="input" type="text" placeholder="Input Project Name"/>
              </div> */}
              <Field name="Name" component={this.renderInput} id="projectName" placeholder="Input Project Name" validate={this.required}/>

              <button className="btn btn-primary" type="submit" disabled={submitting || pristine} >Submit</button>
              
            </form>
          )}
        />
      );
    }
}

export default ProjectAdminForm;