import React from 'react';
import axios from 'axios';

import UserAdminForm from './UserAdminForm';
import history from '../../../history';

class UserAdminEdit extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { user: {} };
    }

    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.upn}`).then(
            res => {
                //console.log(res);
                this.setState({user: res.data})
            }
        );
    }

    onSubmit = formValues => {
        //console.log(formValues);
        axios.patch(`/api/user/${this.props.match.params.upn}`, formValues, {headers: { "Content-Type": "application/json"}}).then(
            res => {
                //console.log(res);
                history.goBack();
            }
        );
    };

    render() {
        if (!this.state.user) {
          return <div>Loading...</div>;
        }

        let {NAME, UPN, ROLE} = this.state.user;

        let init = {'name': NAME, 'upn': UPN, 'roles': [], 'password':''};
        //console.log(init);

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6">
                <h3>Edit User</h3>
                <UserAdminForm
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

export default UserAdminEdit;