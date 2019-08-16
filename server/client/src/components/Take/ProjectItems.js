import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';

import DictionaryCards from './DictionaryCards';
import {resetDictValue} from '../../actions';
import history from '../../history';

class ProjectItems extends React.Component {

    constructor(props){
        super(props);
        this.state = { project:{} };
    }

    componentDidMount(){
        //this.fetchData(this.props.projectId);
        this.props.resetDictValue();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.projectId !== prevProps.projectId) {
          this.props.resetDictValue();
          this.fetchData(this.props.projectId);
          //this.state.test = this.state.test +3;
        }
    }

    fetchData = (projectId) => {
        axios.get(`/api/proj/${projectId}`).then(
            res => {
                //console.log(res.data)
                this.setState({project: res.data})
            }
        );
    }

    handleSubmitClick = async () => {
        for (let item = 0; item < this.state.project.ProjectItem.length ; item++){
            //skip non-created code -> actuaaly should not happen because every field should be filled
            if(this.props.dictValue[this.state.project.ProjectItem[item].id]){
                let kv = Object.entries(this.props.dictValue[this.state.project.ProjectItem[item].id]);
                for (let i = 0; i < kv.length ; i++){
                    if (kv[i][1].type === 'number')
                    {
                        await axios.patch(`/api/dict/current/${kv[i][0]}`,{value:kv[i][1].inc});
                    }
                    //post other API if audit
                }
            }
            
        }

        toast.success("Done!");
        history.goBack();
    }

    render() {
        //console.log(this.props.projectId)
        if (!this.props.projectId) {
            return <div>Please select a project.</div>;
        }

        if  (Object.entries(this.state.project).length === 0 && this.state.project.constructor === Object) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <ul className="list-group">
                    {this.state.project.ProjectItem.map(i => (
                        <>
                            <li key={i.id} className="list-group-item">
                                {i.NAME}
                            </li>
                            <li key={`${i.id}-Dict`} className="list-group-item">
                                <DictionaryCards projItemId={i.id}/>
                            </li>
                        </>
                    ))}
                </ul>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmitClick}>
                  Take!
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { dictValue: state.dictValue };
  };

export default connect(mapStateToProps,{resetDictValue})(ProjectItems);