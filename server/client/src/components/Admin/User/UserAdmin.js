import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom'

class UserAdmin extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { selected: {}, selectAll: 0, users: [], isLoading: true };
        
    }
    
    componentDidMount() {
        this.fetchList();
    }

    fetchList = ()=>{
        axios.get('/api/users').then(
            res => {
                //console.log(res);
                this.setState({users: res.data, selected: {}, selectAll: 0}, 
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
			this.state.users.forEach(x => {
				newSelected[x.UPN] = true;
			});
		}

		this.setState({
			selected: newSelected,
			selectAll: this.state.selectAll === 0 ? 1 : 0
		});
    }

    handleDelete = () => {
        this.setState({isLoading: true},  () => {
            Object.entries(this.state.selected).forEach(
                ([key, value]) => { if(value===true) { axios.delete(`/api/user/${key}`)}}
            )
            this.fetchList();
        })
        ;
    }

    render(){
        
        //console.log(this.props.docs);
        //console.log(this.props);
        const columns = [
          {
            Header: 'Select',
            accessor: "",
            Cell: ({ original }) => {
                //console.log(original);
                return (
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={this.state.selected[original.UPN] === true}
                        onChange={() => this.toggleRow(original.UPN)}
                    />
                );
            },
            Header: x => {
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
            Header: 'User Name',
            accessor: 'NAME',
            style: { 'whiteSpace': 'unset' }
          },{
            Header: 'User UPN',
            accessor: 'UPN',
            style: { 'whiteSpace': 'unset' },
            Cell: row => {
                //console.log(row);
                if(row.value){
                    return(
                        <Link to={`/admin/user/${row.value}`}>{row.value}</Link>
                    )
                }
                return null;
                }
          },{
            Header: 'User Permission',
            accessor: 'ROLE',
            style: { 'whiteSpace': 'unset' }
          },{
            Header: 'Status',
            accessor: 'STATUS',
            style: { 'whiteSpace': 'unset' }
            },{
                Header: 'Read Project',
                accessor: 'READPROJECT',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'Edit Project',
                accessor: 'EDITPROJECT',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'Take Project',
                accessor: 'TAKEPROJECT',
                style: { 'whiteSpace': 'unset' }
            }
        ];

        return (
            <div>
                <Link to="/admin/user/new" className="btn btn-primary">Add User</Link>
                <button type="button" 
                    className="btn btn-danger" 
                    disabled={this.state.isLoading} 
                    onClick={ this.handleDelete }>Delete User</button>
                <h4> Total users: {this.state.users.length}</h4>
                {/* <div>{this.renderList()}</div> */}
                <div>
                    <ReactTable 
                        data={this.state.users}
                        columns={columns}
                        filterable={true}
                        defaultPageSize = {50}
                        pageSizeOptions = {[10, 20, 50, 100]}
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase())!==-1}
                        className="-striped -highlight"
                    />
                </div>
            </div>
        );
    }
}

export default (UserAdmin);