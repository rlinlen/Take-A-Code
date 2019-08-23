import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom'

class ProjectTakens extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { selected: {}, selectAll: 0, items: [], isLoading: true, columns: [{
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
              Header: 'Items ID',
              accessor: 'id',
              style: { 'whiteSpace': 'unset' },
              Cell: row => {
                  //console.log(row);
                  if(row.value){
                      return(
                          <Link to={`/admin/dict/${row.value}`}>{row.value}</Link>
                      )
                  }
                  return null;
                  }
            },{
                Header: 'VALUE',
                accessor: 'VALUE',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'CREATEDTIME',
                accessor: 'CREATEDTIME',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'UPN',
                accessor: 'UPN',
                style: { 'whiteSpace': 'unset' }
            }]
        }
    }
        

    componentDidMount() {
        if(this.props.projectId)
            this.fetchList(this.props.projectId);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.projectId !== prevProps.projectId) {
          this.fetchList(this.props.projectId);
        }
    }

    fetchList = (projectId) => {
        axios.get(`/api/takens/project/${projectId}`).then(
            res => {
                console.log(res);
                this.setState({items: res.data, selected: {}, selectAll: 0}, 
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
			this.state.items.forEach(item => {
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
                    await axios.delete(`/api/dict/${kv[i][0]}`)
                }
            }

            //console.log('deleted')
            this.fetchList();

            /* Object.entries(this.state.selected).forEach(
                ([key, value]) => { if(value===true) {axios.delete(`/api/dict/${key}`)}}
            )
            this.fetchList(); */
        })
        
    }

    renderList (){
        if (this.state.items && this.state.columns){
            return (
                <>
                    <h4> Total items: {this.state.items.length}</h4>
                    <div>
                        <ReactTable 
                            data={this.state.items}
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

export default (ProjectTakens);