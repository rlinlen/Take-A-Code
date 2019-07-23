import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import DictAdminForm from './DictAdminForm';
import history from '../../../history';

class DictAdminEdit extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { dict: {}, message: "" };
    }

    componentDidMount() {
        axios.get(`/api/dict/${this.props.match.params.id}`).then(
            res => {
                //console.log(res);
                this.setState({dict: res.data})
            }
        );
    }

    onSubmit = formValues => {
      let {id, ...idRemoved} = formValues;

      axios.patch(`/api/dict/${this.props.match.params.id}`, idRemoved, {headers: { "Content-Type": "application/json"}}).then(
        res => {
            //console.log(res);
            toast.success("Done!");
            history.goBack();
        }
      ).catch(e=>{
        toast.error(e.response.data.message);
      });
    };

    render() {
        if (!this.state.dict) {
          return <div>Loading...</div>;
        }

        //let {name, upn, role} = this.state.Dict;
        //let init = {'name': name, 'upn': upn, 'role': role};
        //console.log(init);
        let init = this.state.dict;

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h3>Edit Dictionary</h3>
                <DictAdminForm
                  initialValues={init}
                  onSubmit={this.onSubmit}
                />
              </div>
            </div>
          </div>
        );
      }
}

export default DictAdminEdit;