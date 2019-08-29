import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';


class UserAdminForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { isLoading: false };
        this.init = {name:'',password:'',role:'',upn:''}
    }

  validate = (values) => {
      let errors = {};
      if (!values.upn) {
        errors.upn = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.upn)) {
        errors.upn = 'Invalid email address';
      }
      if (!values.name)
        errors.name = 'Required';
      // ...
      return errors;
  };

   /*  renderFieldArray = ({ push, remove, form }) => (
        <ul className="list-group">
            <label>User Role:</label>
          <li className="list-group-item">
            <button type="button" className="btn btn-info" onClick={() => push('')}>
              Add Role
            </button>
          </li>
          {form.values.roles ? form.values.roles.map((member, index) => (
            <li key={index} className="list-group-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(index)}>Remove Role</button>
              <Field
                name={`roles.${index}.role`}
                type="text"
                component={this.renderText}
                label={`Role #${index + 1}`}
              />
            </li>
          )) : <></>}
        </ul>
      ) */


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
    
      onSubmit = formValues => {
        this.setState({isLoading:true}, 
          ()=>{this.props.onSubmit(formValues);})
      };
    
      render() {
        return (
          <Formik
            initialValues={this.props.initialValues || this.init}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <Field name="name" component={this.renderText} label="User Name: " />
                <Field name="upn" component={this.renderText} label="User UPN: " readonly={this.props.mode==='EDIT' ? true : false}/>
                <Field name="password" component={this.renderText} label="User password: "/>
                <Field name="role" component={this.renderText} label="User role: "/>
                <button type="submit" className="btn btn-primary" disabled={this.state.isLoading}>Submit</button>
              </Form>
            )}
          />
        );
      }
}

export default UserAdminForm;