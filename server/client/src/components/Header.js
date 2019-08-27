import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends React.Component {
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
                <li key="admin" className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>,
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