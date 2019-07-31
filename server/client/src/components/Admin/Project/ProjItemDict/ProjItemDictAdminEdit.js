import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import ProjItemDictAdminForm from './ProjItemDictAdminForm';
import history from '../../../../history';

class ProjItemDictAdminEdit extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { item: {}, options:{} };
    }

    componentDidMount() {
        axios.get(`/api/projItemDict/${this.props.match.params.projItemId}`).then(
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
      console.log(formValues)
      //let {id, ...idRemoved} = formValues;

      axios.patch(`/api/projItemDict/${this.props.match.params.projItemId}`, formValues, {headers: { "Content-Type": "application/json"}}).then(
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
        if ( 
          (Object.entries(this.state.options).length === 0 && this.state.options.constructor === Object)) {
          return <div>Loading...</div>;
        }
        //(Object.entries(this.state.item).length === 0 && this.state.item.constructor === Object) || 
        
        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h3>Edit ProjectItem-Dictionary</h3>
                <ProjItemDictAdminForm
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

export default ProjItemDictAdminEdit;