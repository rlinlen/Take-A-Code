import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {fetchUser} from '../actions';

class LoginLocal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        };
      }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        try{
            const res = await axios.post('/api/login/local', { username, password }, {headers: { "Content-Type": "application/json"}});
            //console.log(res);
            if (res.status === 200){
                await this.props.fetchUser();
                this.props.history.push('/study');
            }
        } catch (error){
            //console.log(error.response);
            this.setState({message: error.response.data});
        }
        
        
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    render(){
        const { username, password } = this.state;
        return (
            <div className="container-fluid h-100">
                <div className = "row h-100 justify-content-center align-items-center">
                <div className="card mb-5 mx-auto text-center border-info d-block" style={{width:"22em"}}>
                    <h5 className="card-header text-white bg-info text-center">Sign in</h5>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-danger">{this.state.message}</h6>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputUsername">Username:</label>
                                <input type="email" className="form-control" name="username" id="inputUsername" value={username} onChange={this.handleChange} autoComplete="off"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password:</label>
                                <input type="password" className="form-control" name="password" id="inputPassword" value={password} onChange={this.handleChange} autoComplete="off"/>
                            </div>
                            <div>
                                <input type="submit" className="btn btn-primary" value="Log In"/>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
          );
    }
};

//<form action="/api/login/local" method="post">

export default connect(null,{fetchUser})(withRouter(LoginLocal));