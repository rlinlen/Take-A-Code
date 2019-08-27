import React from 'react';
import {Link} from 'react-router-dom';


const Login = () => {
    const btnRound = {
        fontSize: '90%',
        borderRadius: '25px'
    };

    return (
    <div className="container-fluid h-100">
        <div className = "row h-100 justify-content-center align-items-center">
          <div className="card mb-5 mx-auto text-center border-info d-block" style={{width:"22em"}}>
            <h5 className="card-header text-white bg-info text-center">Sign in</h5>
            <div className="card-body">
              <p className="card-text text-muted p-4">Welcome to Take-A-Code! Please choose a method to sign in.</p>
      
              <div className="p-2">
                  <a href="/api/login/azuread" className="btn btn-outline-primary btn-block mb-2" style={btnRound}><i className="fab fa-windows"></i> Sign in with Microsoft</a>
                  <Link to="/login/local" className="btn btn-outline-secondary btn-block mb-2" style={btnRound}><i className="far fa-envelope"></i> Sign in with Email</Link>
              </div>
                
            </div>
            <div className="card-footer" style={{borderColor:"transparent", backgroundColor:"transparent"}}><small>No account?</small>
              <a href = "https://www.google.com"><small>Apply here</small></a>
            </div>
          </div>
        </div>
    </div>
      
    );
  };
/* const Login = () => {
  return (
    <div className="row">
        <div className="col-sm-6">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Aprinoia User</h5>
                <p className="card-text">SSO using Azure AD</p>
                <a href="/api/login/azuread" className="btn btn-primary">Microsoft Login</a>
            </div>
            </div>
        </div>
        <div className="col-sm-6">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Other User</h5>
                <p className="card-text">Register Locally</p>
                <a href="#" className="btn btn-primary">Local Login</a>
            </div>
            </div>
        </div>
    </div>
  );
}; */

export default Login;