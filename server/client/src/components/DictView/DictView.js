import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom'

class DictView extends React.Component {
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
                          <Link to={`/dictview/${row.value}`}>{row.value}</Link>
                      )
                  }
                  return null;
                  }
            },{
                Header: 'Dictionary Name',
                accessor: 'NAME',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'Dictionary Type',
                accessor: 'DICT_TYPE',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'Dictionary Rule',
                accessor: 'DICT_RULE',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'Dictionary Current',
                accessor: 'DICT_CURRENT',
                style: { 'whiteSpace': 'unset' }
            }]
        }
    }
        

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        axios.get('/api/dicts').then(
            res => {
                //console.log(res);
                this.setState({items: res.data.filter(i => i.DICT_TYPE === 'select'), selected: {}, selectAll: 0}, 
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

    renderList (){
        if (this.state.items && this.state.columns){

            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <h4> Total select dictionary: {this.state.items.length}</h4>
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
                        </div>
                    </div>
                </div>
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

export default (DictView);