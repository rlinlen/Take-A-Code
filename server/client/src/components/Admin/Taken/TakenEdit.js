import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { toast } from 'react-toastify';

import {leaf} from '../../Util/Util';

class TakenEdit extends React.Component {
    constructor(props){
        super(props);
        //this.state = {};
        this.state = { unlocked:false, selected: {}, selectAll: 0, items: [], isLoading: true, columns: [{
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
              Cell : (row) => (this.state.unlocked) ? (<button type="button" className="btn btn-primary btn-sm" onClick={e => this.handleSaveClick(e, row)}>Save</button>) : row.value
            },{
                id: 'projectItem.NAME',
                Header: 'NAME',
                accessor: i => i.projectItem.NAME,
                style: { 'whiteSpace': 'unset' },
                filterMethod: (filter, row) => {
                    return filter.value === "all" ? true : (row[filter.id] === filter.value)
                },
                Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="all">All</option>
                    {this.fetchUniqueItems('projectItem.NAME')}
                  </select>
            },{
                Header: 'VALUE',
                accessor: 'VALUE',
                style: { 'whiteSpace': 'unset' }
            },{
                Header: 'CREATEDTIME',
                accessor: 'CREATEDTIME',
                style: { 'whiteSpace': 'unset' },
                Cell: (row) => row.value ? row.value.split('T')[0] : ''
            },{
                Header: 'UPN',
                accessor: 'UPN',
                style: { 'whiteSpace': 'unset' },
                filterMethod: (filter, row) => {
                    return filter.value === "all" ? true : (row[filter.id] === filter.value)
                },
                Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="all">All</option>
                    {this.fetchUniqueItems('UPN')}
                  </select>
            },{
                Header: 'COMMENT',
                accessor: 'COMMENT',
                style: { 'whiteSpace': 'unset' },
                Cell: this.renderComment
            },{
                Header: 'STATUS',
                accessor: 'STATUS',
                style: { 'whiteSpace': 'unset' },
                Cell: (row) => row.value===1 ? <p className="text-primary">Enabled</p> : <p className="text-secondary">Disabled</p>,
                filterMethod: (filter, row) => {
                    return filter.value === "all" ? true : (row[filter.id] === +(filter.value))
                },
                Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="all">All</option>
                    <option value="1">Enabled</option>
                    <option value="0">Disabled</option>
                  </select>
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
                //console.log(res);
                this.setState({items: res.data, selected: {}, selectAll: 0}, 
                        () => {this.setState({ isLoading: false })});
            }
        ).catch(
            res => {
                this.setState({items: {'error':'Try again later.'}})
            }
        );        
    }

    fetchUniqueItems = (itemName) => {
        let itemsArray = this.state.items.map(i => leaf(i,itemName));
        let uniqueArray = [...new Set(itemsArray)]
        //console.log(uniqueArray)
        return uniqueArray.map(i => <option value={i} key={i}>{i}</option>)
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
                    await axios.delete(`/api/taken/${kv[i][0]}`)
                }
            }

            //console.log('deleted')
            this.fetchList(this.props.projectId);

            /* Object.entries(this.state.selected).forEach(
                ([key, value]) => { if(value===true) {axios.delete(`/api/dict/${key}`)}}
            )
            this.fetchList(); */
        })
        
    }

    handleSaveClick = async (e, row) => {
        //console.log(row)
        await axios.patch(`/api/taken/comment/${row.value}`,{COMMENT: row.original.COMMENT}, {headers: { "Content-Type": "application/json"}})
            .then(function (response) {
                if(response.status !== 200){
                    toast.error(response.data.message);
                }
                toast.success("Done!");
            })
            .catch(error => {
                toast.error(error.response);
            } )

        this.fetchList(this.props.projectId);
    }

    renderComment = (cellInfo) => {
        if (this.state.unlocked === false){
            return (<div>{cellInfo.value}</div>)
        }
        else{
            return (
                <div>
                    <div
                        style={{ backgroundColor: "#fafafa" }}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={e => {
                        const items = [...this.state.items];
                        items[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ items });
                        }}
                        dangerouslySetInnerHTML={{
                        __html: this.state.items[cellInfo.index][cellInfo.column.id]
                        }}
                    />
                
                </div>
              )
        }
        
    }
    
    renderList (){
        if (this.state.items && this.state.items.error ){
            return (
                this.state.items.error
            )
        }
        if (this.state.items && this.state.columns){
            return (
                <>
                    <button type="button" 
                        className="btn btn-danger" 
                        disabled={this.state.isLoading} 
                        onClick={ this.handleDelete }>Disable Record</button>
                    <button type="button" 
                        className="btn btn-info" 
                        disabled={this.state.isLoading} 
                        onClick={ () => {this.setState({unlocked:!this.state.unlocked})}}>{this.state.unlocked? <>Lock</>: <>Unlock</>}</button>
                    <h4> Total items: {this.state.items.length}</h4>
                    <div>
                        <ReactTable 
                            ref={(r) => this.reactTable = r}
                            data={this.state.items}
                            columns={this.state.columns}
                            filterable={true}
                            defaultPageSize = {20}
                            pageSizeOptions = {[10, 20, 50, 100]}
                            defaultFilterMethod={(item, row) =>
                                String(row[item.id]).toLowerCase().indexOf(item.value.toLowerCase())!==-1}
                            className="-striped -highlight"
                            defaultSorted={[
                                {
                                  id: "CREATEDTIME",
                                  desc: true
                                }
                              ]}
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

export default (TakenEdit);