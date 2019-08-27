import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        /* try{
          let res = await axios.patch(`/api/user/${this.props.match.params.upn}`, formValues, {headers: { "Content-Type": "application/json"}})
          console.log(res);
          history.goBack();
        }
        catch(error){
          console.error(error);
          console.log('123')
          console.log(error.response.status)
          toast.error(error.response);
        } */
        axios.patch(`/api/user/${this.props.match.params.upn}`, formValues, {headers: { "Content-Type": "application/json"}})
          .then(function (response) {
            if(response.status === 503){
              toast.error(response.data.message);
            }
            else{
              history.goBack();
            }
            
          })
          .catch(error => {
            //don't know how to handle error status.
            console.error(error);
            console.log('123')
            console.log(error.response.status)
            toast.error(error.response);
          } )
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