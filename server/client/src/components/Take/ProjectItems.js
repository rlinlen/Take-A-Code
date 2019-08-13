import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import DictionaryCards from './DictionaryCards';
import {resetDictValue} from '../../actions';

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
            </div>
        )
    }
}




export default connect(null,{resetDictValue})(ProjectItems);