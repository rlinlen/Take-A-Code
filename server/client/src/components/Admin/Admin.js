import React from 'react';
import {Link} from 'react-router-dom';


const Admin = () => {
    const style = {
        LinkStyle: {
            'textDecoration': 'none',
            'color': 'inherit'
        },
        IconStyle: {
            'fontSize': '30pt'
        }
    }

    const handleCardEnter = (e) => {
        //prevent hover into child object and get shadow effect
        if( !e.target.classList.contains("card-body")) {
            return;
        }
        e.stopPropagation();
        e.target.classList.add('shadow');
    }
    const handleCardLeave = (e) => {
        //console.log(e.target);
        if( !e.target.classList.contains("card-body")) {
            return;
        }
        e.stopPropagation();
        e.target.classList.remove('shadow');
    }

  return (
    <div className="container">
        <div className="card-deck">
            <div className="card text-center mt-3 border-primary">
                <Link to="/admin/projects" style={style.LinkStyle}>
                    <div className="card-body" onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
                        <h5 className="card-title">Project Admin</h5>
                        <div className="mb-2"><i className="fas fa-users text-primary" style={style.IconStyle}></i></div>
                        <p className="card-text">Manage Project Detail</p>
                    </div> 
                </Link>
            </div>
             <div className="card text-center mt-3 border-danger">
                <Link to="/admin/dicts" style={style.LinkStyle}>
                    <div className="card-body" onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
                        <h5 className="card-title">Dictionary Admin</h5>
                        <div className="mb-2"><i className="fas fa-file-medical text-danger" style={style.IconStyle}></i></div>
                        <p className="card-text">Manage Dictionary Detail</p>
                    </div>    
                </Link>
            </div>
            <div className="w-100 d-none d-lg-block my-1"></div>
            {/*<div className="card text-center mt-3 border-warning">
                <Link to="/admin/news" style={style.LinkStyle}>
                    <div className="card-body" onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
                        <h5 className="card-title">News Admin</h5>
                        <div className="mb-2"><i className="fas fa-rss text-warning" style={style.IconStyle}></i></div>
                        <p className="card-text">Manage News Detail</p>
                    </div>   
                </Link>
            </div>
            <div className="card text-center mt-3 border-info">
                <Link to="/admin/dicts" style={style.LinkStyle}>
                    <div className="card-body" onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
                        <h5 className="card-title">Dictionary Admin</h5>
                        <div className="mb-2"><i className="fas fa-book text-info" style={style.IconStyle}></i></div>
                        <p className="card-text">Manage Dictionary Detail</p>
                    </div>    
                </Link>
            </div>
            <div className="card text-center mt-3 border-success">
                <Link to="/admin/audits" style={style.LinkStyle}>
                    <div className="card-body" onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
                        <h5 className="card-title">Audit Admin</h5>
                        <div className="mb-2"><i className="fas fa-user-check text-success" style={style.IconStyle}></i></div>
                        Manage Audit Detail
                    </div>   
                </Link>
            </div> */}
        </div>
    </div>
  );
};

export default Admin;