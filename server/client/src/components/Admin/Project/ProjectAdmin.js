import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom'

class ProjectAdmin extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { selected: {}, selectAll: 0, projects: [], isLoading: true, columns: [{
              accessor: "",
              Cell: ({original}) => {
                  //console.log(original);
                  return (
                      <input
                          type="checkbox"
                          className="checkbox"
                          checked={this.state.selected[original.id] === true}
                          onChange={() => this.toggleRow(original.id)}
                      />
                  );
              },
              Header: () => {
                  return (
                      <input
                          type="checkbox"
                          className="checkbox"
                          checked={this.state.selectAll === 1}
                          ref={input => {
                              if (input) {
                                  input.indeterminate = this.state.selectAll === 2;
                              }
                          }}
                          onChange={() => this.toggleSelectAll()}
                      />
                  );
              },
              sortable: false,
              width: 45
            },{
              Header: 'Project ID',
              accessor: 'id',
              style: { 'whiteSpace': 'unset' },
              Cell: row => {
                  //console.log(row);
                  if(row.value){
                      return(
                          <Link to={`/admin/proj/${row.value}`}>{row.value}</Link>
                      )
                  }
                  return null;
                  }
            },{
                Header: 'Project Name',
                accessor: 'NAME',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'NOTE',
                accessor: 'NOTE',
                style: { 'whiteSpace': 'unset' }
            }/* ,{
                Header: 'Manage',
                accessor: 'id',
                style: { 'whiteSpace': 'unset' },
                Cell: row => {
                    //console.log(row);
                    if(row.value){
                        return(
                            <div className="btn-group">
                                <Link to={`/admin/project/${row.value}`} className="btn btn-primary">Manage Project {row.value}</Link>
                                <Link to={`/admin/projectItems/${row.value}`} className="btn btn-secondary">Manage ProjectItem Definetion</Link>
                            </div>
                        )
                    }
                    return null;
                }
            } */]
        }
    }
        

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        axios.get('/api/projs').then(
            res => {
                console.log(res);
                this.setState({projects: res.data, selected: {}, selectAll: 0}, 
                        () => {this.setState({ isLoading: false })});
            }
        );        
    }

    toggleRow = (id) => {
        //const newSelected = Object.assign({}, this.state.selected);
        const newSelected = {...this.state.selected};
		newSelected[id] = !this.state.selected[id]; //if null -> true; if something -> false
		this.setState({
			selected: newSelected,
			selectAll: 2
		});
	}

	toggleSelectAll = () => {
		let newSelected = {};

		if (this.state.selectAll === 0) {
			this.state.projects.forEach(item => {
				newSelected[item.id] = true;
			});
		}

		this.setState({
			selected: newSelected,
			selectAll: this.state.selectAll === 0 ? 1 : 0
		});
    }

    handleDelete = () => {
        this.setState({isLoading: true}, async () => {
            let kv = Object.entries(this.state.selected);
            //async version
            for (let i = 0; i < kv.length; i++){
                if(kv[i][1]===true){
                    await axios.delete(`/api/proj/${kv[i][0]}`)
                }
            }

            this.fetchList();

        })
        
    }

    renderList (){
        if (this.state.projects && this.state.columns){

            return (
                <>
                    <Link to="/admin/proj/new" className="btn btn-primary">Add Project</Link>
                    <button type="button" 
                        className="btn btn-danger" 
                        disabled={this.state.isLoading} 
                        onClick={ this.handleDelete }>Delete Project</button> 
                    <h4> Total projects: {this.state.projects.length}</h4>
                    <div>
                        <ReactTable 
                            data={this.state.projects}
                            columns={this.state.columns}
                            filterable={true}
                            defaultPageSize = {50}
                            pageSizeOptions = {[10, 20, 50, 100]}
                            defaultFilterMethod={(item, row) =>
                                String(row[item.id]).toLowerCase().indexOf(item.value.toLowerCase())!==-1}
                            className="-striped -highlight"
                        />
                    </div>
                </>
            )
        }
        return (
                "Now Loading..."
        )
        
    }

    render(){
        
        //console.log(this.props.docs);
        //console.log(this.props);
        

        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

export default (ProjectAdmin);