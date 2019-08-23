import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import ProjectAdminForm from './ProjectAdminForm';
import history from '../../../history';

class ProjectAdminNew extends React.Component {

    onSubmit = formValues => {
        //console.log(formValues);
        axios.post('/api/proj/new', formValues, {headers: { "Content-Type": "application/json"}}).then(
            res => {
                //console.log(res);
                toast.success("Done!");
                history.goBack();
            }
        ).catch(e=>{
          //this.setState({message: e.response.data.message});
          toast.error(e.response.data.message);
        });
    };

    render() {

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h3>New Project</h3>
                <ProjectAdminForm
                  onSubmit={this.onSubmit}
                />
              </div>
            </div>
          </div>
        );
      }
}

export default ProjectAdminNew;