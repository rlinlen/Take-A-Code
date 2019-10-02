import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import logo from '../images/trademark-transparent.png'

class Header extends React.Component {
    adminRender(){
        if(this.props.auth && this.props.auth.ROLE && this.props.auth.ROLE.includes('admin'))
        {
            return <li key="admin" className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
        }
        return <li key="admin" className="nav-item"></li>
    }
    logoutRender(){
        // determine if needs to SSO logout
        if(this.props.auth && this.props.auth.azureId)
        {
            return <li key="logout" className="nav-item"><a className="nav-link" href="/api/logout/azuread">Logout</a></li>
        }
        return <li key="logout" className="nav-item"><a className="nav-link" href="/api/logout/local">Logout</a></li>
    }
    loginRender(){
        //console.log(this.props.auth);
        switch (this.props.auth) {
            case null:
              return;
            case false:
              return <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            default:
              return [
                <li key="take" className="nav-item"><Link className="nav-link" to="/take/new">Take!</Link></li>,
                <li key="browse" className="nav-item"><Link className="nav-link" to="/browse">Browse</Link></li>,
                this.adminRender(),
                <li key="user" className="nav-item">
                  <Link to="/user" className="nav-link"><b>{this.props.auth.UPN}</b></Link>
                </li>,
                this.logoutRender()
              ];
          }
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/browse" className="navbar-brand">
                    <img src={logo} className="float-left mx-1" alt="APRINOIA" height="50"/><h3 className="mt-1">Take-A-Code</h3> 
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav ">
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        {this.loginRender()}
                    </ul>
                </div>
            </nav>
        );
    };
    
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);