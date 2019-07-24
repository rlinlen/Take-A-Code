import React from 'react';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

class TakeForm extends React.Component {
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
  
    renderSelect = ({ input, label, meta, id , options}) => {
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <select {...input} className="form-control" id={id} autoComplete="off">
            <option>----</option>
            {options.map(i => <option key={i.id} value={i.id}>{i.NAME}</option>)}
          </select>
          {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
        </div>
      );
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


    renderField = ({ input, field }) => {
      const { type, placeholder } = field;
      if (type === 'text') {
        return <input {...input} placeholder={placeholder} type={type} />
      } else if (type === 'select') {
        const { options } = field
        return (
          <select name={field.name} onChange={input.onChange}>
            {options.map((option, index) => {
              return <option key={index} value={option.value}>{option.label}</option>
            })}
          </select>
        )
      } else if (type === 'number') {

      } else {
        return <div>Type not supported.</div>
      }
    }

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

              
              <Field name="Project" component={this.renderSelect} label="Name" id="dictName" placeholder="Input Dict Name" validate={this.required}/>
              <Field name="DICT_RULE" component={this.renderInput} label="Dict_Rule" id="dictRule" placeholder="Input Dict Rule" />

              <FieldArray name="DictionaryItem" component={this.renderFieldArray}/>
              

              <button className="btn btn-primary" type="submit" disabled={submitting || pristine} >Submit</button>
              
            </form>
          )}
        />
      );
    }
}

export default TakeForm;