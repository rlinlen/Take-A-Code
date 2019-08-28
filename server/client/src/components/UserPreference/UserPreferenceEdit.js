import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import UserPreferenceForm from './UserPreferenceForm';
import history from '../../history';

class UserPreferenceEdit extends React.Component {
  constructor(props){
    super(props);
    //this.state = {};
    this.state = { user: {} };
  }

  componentDidMount() {
      axios.get(`/api/user/${this.props.auth.UPN}`).then(
          res => {
              console.log(res);
              this.setState({user: res.data})
          }
      );
  }

  onSubmit = formValues => {
      //console.log(formValues);
      axios.patch(`/api/user/${this.props.auth.UPN}`, formValues, {headers: { "Content-Type": "application/json"}}).then(
          res => {
              //console.log(res);
              history.goBack();
          }
      );
  };


    render() {
        //console.log(this.props.auth);

        if (!this.state.user) {
          return <div>Loading...</div>;
        }

        let {NAME, UPN, ROLE} = this.state.user;

        let init = {'name': NAME, 'upn': UPN, 'role': ROLE};
        //console.log(init);

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6">
                <h3>Edit Preference</h3>
                <UserPreferenceForm
                  initialValues={init}
                  onSubmit={this.onSubmit}
                  mode='EDIT'
                />
              </div>
            </div>
          </div>
        );
      }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserPreferenceEdit);