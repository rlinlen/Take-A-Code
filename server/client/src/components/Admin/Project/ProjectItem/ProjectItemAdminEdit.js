import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import ProjectItemAdminForm from './ProjectItemAdminForm';
import history from '../../../../history';

class ProjectItemAdminEdit extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { item: {}, options:{} };
    }

    componentDidMount() {
        axios.get(`/api/projectItem/${this.props.match.params.projectId}`).then(
            res => {
                //console.log(res);
                this.setState({item: res.data})
            }
        );

        axios.get(`/api/dicts`).then(
          res => {
              //console.log(res);
              //this.setState({item: res.data})
              this.setState({
                options: res.data
              })
          }
      );
    }

    onSubmit = formValues => {
      let {id, ...idRemoved} = formValues;

      axios.patch(`/api/projectItem/${this.props.match.params.projectId}`, idRemoved, {headers: { "Content-Type": "application/json"}}).then(
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
        if ( (Object.entries(this.state.item).length === 0 && this.state.item.constructor === Object) || 
          (Object.entries(this.state.options).length === 0 && this.state.options.constructor === Object)) {
          return <div>Loading...</div>;
        }
        
        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h3>Edit Project</h3>
                <ProjectItemAdminForm
                  initialValues={this.state.item}
                  onSubmit={this.onSubmit}
                  options={this.state.options}
                />
              </div>
            </div>
          </div>
        );
      }
}

export default ProjectItemAdminEdit;