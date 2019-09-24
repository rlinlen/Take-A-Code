import React from 'react';
import axios from 'axios';

import UserAdminForm from './UserAdminForm';
import history from '../../../history';

class UserAdminNew extends React.Component {

    onSubmit = formValues => {
        //console.log(formValues);
        axios.post('/api/user/new', formValues, {headers: { "Content-Type": "application/json"}}).then(
            res => {
                console.log(res);
                history.goBack();
            }
        );
    };

    render() {

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6">
                <h3>New User</h3>
                <UserAdminForm
                  onSubmit={this.onSubmit}
                />
              </div>
            </div>
          </div>
        );
      }
}

export default UserAdminNew;