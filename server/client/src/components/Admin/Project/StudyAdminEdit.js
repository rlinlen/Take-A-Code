import React from 'react';
import axios from 'axios';

import StudyAdminForm from './StudyAdminForm';
import history from '../../../history';
import Dictionary from '../../Util/Dictionary';
import Modal from '../../Modal';

class StudyAdminEdit extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { study: {}, message: "" };
    }

    componentDidMount() {
        axios.get(`/api/study/${this.props.match.params.StudyId}`).then(
            res => {
                //console.log(res);
                this.setState({study: res.data})
            }
        );
    }

    onSubmit = formValues => {
        let y = {...formValues}
        y.SubjectInfo.Number = [parseInt(y.SubjectInfo.Number)];
        axios.patch(`/api/study/${this.props.match.params.StudyId}`, y, {headers: { "Content-Type": "application/json"}}).then(
            res => {
                //console.log(res);
                history.goBack();
            }
        ).catch(e=>{
          //console.log(e.response);
          this.setState({message: e.response.data.message});
        });;
    };

    handleModalClick = () => {
      this.setState({message:""});
    };

    renderError = (message) => {
      if(message)
        return (
        <Modal handleClick={this.handleModalClick}>
          <div className="alert alert-danger" role="alert">
            <p>{message}</p>
          </div>
        </Modal>)
    }

    render() {
        if (!this.state.study) {
          return <div>Loading...</div>;
        }

        //let {name, upn, role} = this.state.study;
        //let init = {'name': name, 'upn': upn, 'role': role};
        //console.log(init);
        let init = this.state.study;

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h3>Edit Study</h3>
                <StudyAdminForm
                  initialValues={init}
                  onSubmit={this.onSubmit}
                  mode='EDIT'
                />
              </div>
              <div className="col-lg-3">
                <Dictionary />
              </div>
            </div>
            {this.renderError(this.state.message)}
          </div>
        );
      }
}

export default StudyAdminEdit;