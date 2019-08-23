import React from 'react';
import axios from 'axios';

import ProjectTakens from './ProjectTakens';

class BrowseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { projs:{}, selectedProj:"" };
    }

    componentDidMount(){
        axios.get(`/api/projs`).then(
          res => {
              //console.log(res);
              //this.setState({item: res.data})
              this.setState({
                projs: res.data
              })
          }
        );
    }
    

    handleProjChange = (event) => {
        this.setState({selectedProj: event.target.value});
    }

    render() {
      //console.log(this.state.projs)
      if ( 
        (Object.entries(this.state.projs).length === 0 && this.state.projs.constructor === Object)) {
        return <div>Loading...</div>;
      }

        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <h3>Select Project</h3>
                <select className="form-control" value={this.state.selectedProj} onChange={this.handleProjChange}>
                    <option value="">----</option>
                    {this.state.projs.map(i => <option key={i.id} value={i.id}>{i.NAME}</option>)}
                </select>
                <hr/>
                <ProjectTakens projectId={this.state.selectedProj}/>
              </div>
            </div>
          </div>
        );
      }
   
}

export default BrowseForm;