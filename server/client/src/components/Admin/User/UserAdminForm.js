import React from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import Select from 'react-select'


class UserAdminForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { projects: [] };
        this.init = {name:'',password:'',role:'',upn:''}
    }

    componentDidMount(){
      this.fetchProj();
    }

    fetchProj = () => {
      axios.get('/api/projs').then(
          res => {
            console.log(res.data)
            this.setState({projects: res.data})
          }
      )        
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
      /* renderMultiSelect = ({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        label,
        id,
        options,
        ...props
      }) => {
        return (
          <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select {...field} className="form-control" id={id} autoComplete="off">
              <option>----</option>
              {options.map(i => {
                return <option key={i.id} value={i.id}>{i.NAME}</option>
              })}
            </select>
            <ErrorMessage name={field.name}>
              {errorMessage => <div className="text-danger">{errorMessage}</div>}
            </ErrorMessage>
          </div>
        );
      }; */

      getMultiSelectValue = (field, options) => {
          //console.log('get select')
          //console.log(field.value)

          return Array.isArray(field.value) ? options.filter(option => field.value.indexOf(option.id) >= 0) : options.filter(option => field.value == option.id)
          //if(field.value)
            //return options.filter(option => field.value.indexOf(option.id) >= 0)
          //return []
          
      };

      handleMultiSelectChange = (selectedOption, field, form) => {
        //selectedOption: [{NAME:,NOTE:,id:},]

        //e.persist();
        const { setFieldValue } = form;
        //const { name, value } = e.target;
        //console.log('handle select')
        //console.log(selectedOption);
        let output = selectedOption ? selectedOption.map(i => i.id) :  null
        setFieldValue(field.name, output);
      }

      
      renderMultiSelect = ({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        label,
        id,
        options,
        ...props
      }) => {
        return (
          <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <Select
              name={field.name}
              value={this.getMultiSelectValue(field,options)}
              onChange={selectedOption => this.handleMultiSelectChange(selectedOption, field, form)}
              options={options}
              isMulti
              isSearchable
              getOptionValue={option => option['id']}
              getOptionLabel={option => option['NAME']}
            />
            <ErrorMessage name={field.name}>
              {errorMessage => <div className="text-danger">{errorMessage}</div>}
            </ErrorMessage>
          </div>
        );
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
    
      onSubmit = formValues => {
          this.props.onSubmit(formValues)
      ;}
    
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
                <Field name="readproject" component={this.renderMultiSelect} label="READ PROJECT" id="READPROJECT" options={this.state.projects}/>
                <Field name="takeproject" component={this.renderMultiSelect} label="TAKE PROJECT" id="TAKEPROJECT" options={this.state.projects}/>
                <Field name="editproject" component={this.renderMultiSelect} label="EDIT PROJECT" id="EDITPROJECT" options={this.state.projects}/>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
              </Form>
            )}
          />
        );
      }
}

export default UserAdminForm;