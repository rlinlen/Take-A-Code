import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import ProjectAdminForm from './ProjectAdminForm';
import history from '../../../history';

class ProjectAdminEdit extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { project: {}, message: "" };
    }

    componentDidMount() {
        axios.get(`/api/proj/${this.props.match.params.id}`).then(
            res => {
                //console.log(res);
                this.setState({project: res.data})
            }
        );
    }

    onSubmit = formValues => {
      let {id, ...idRemoved} = formValues;

      axios.patch(`/api/proj/${this.props.match.params.id}`, idRemoved, {headers: { "Content-Type": "application/json"}}).then(
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
        if (!this.state.project) {
          return <div>Loading...</div>;
        }

        //let {name, upn, role} = this.state.Project;
        //let init = {'name': name, 'upn': upn, 'role': role};
        //console.log(init);
        let init = this.state.project;

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h3>Edit Project</h3>
                <ProjectAdminForm
                  initialValues={init}
                  onSubmit={this.onSubmit}
                />
              </div>
            </div>
          </div>
        );
      }
}

export default ProjectAdminEdit;