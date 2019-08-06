import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends React.Component {
    loginRender(){
        //console.log(this.props.auth);
        return [
            <li key="bulletin" className="nav-item">Bulletin</li>,
            <li key="take" className="nav-item"><Link className="nav-link" to="/take/new">Take!</Link></li>,
            <li key="admin" className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>,
            ];
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

export default connect(null)(Header);