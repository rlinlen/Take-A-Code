import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import Landing from './Landing';
import Admin from './Admin/Admin';
import ProjectAdmin from './Admin/Project/ProjectAdmin';
import ProjectAdminNew from './Admin/Project/ProjectAdminNew';
import ProjectAdminEdit from './Admin/Project/ProjectAdminEdit';
import DictAdmin from './Admin/Dict/DictAdmin';
import DictAdminNew from './Admin/Dict/DictAdminNew';
import DictAdminEdit from './Admin/Dict/DictAdminEdit';
import ProjectItemAdmin from './Admin/Project/ProjectItem/ProjectItemAdmin';
import ProjectItemAdminNew from './Admin/Project/ProjectItem/ProjectItemAdminNew';
import ProjectItemAdminEdit from './Admin/Project/ProjectItem/ProjectItemAdminEdit';

class App extends React.Component {

    render(){
        return (
            <div className="h-100">
                <Router history={history}>
                    <>
                        <Header />
                        <Switch>
                            <Route path='/' exact component={Landing} />
                            <Route path='/admin' exact component={Admin} />
                            <Route path='/admin/projects' exact component={ProjectAdmin} />
                            <Route path='/admin/project/new' exact component={ProjectAdminNew} />
                            <Route path='/admin/project/:id' exact component={ProjectAdminEdit}  />
                            <Route path='/admin/dicts' exact component={DictAdmin} />
                            <Route path='/admin/dict/new' exact component={DictAdminNew} />
                            <Route path='/admin/dict/:id' exact component={DictAdminEdit}  />
                            <Route path='/admin/projectItems/:projectId' exact component={ProjectItemAdmin} />
                            <Route path='/admin/projectItem/:projectId/new' exact component={ProjectItemAdminNew} />
                            <Route path='/admin/projectItem/:projectId' exact component={ProjectItemAdminEdit} />
                        </Switch>
                    </>
                </Router>
                <ToastContainer />
            </div>
            );
    }
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps,null)(App);
// <AuthenticationRoute path='/study' exact component={Authorization(this.props.auth,'app')(SearchApp)} />
//<AuthenticationRoute path='/study/:id' component={AuthMatch(this.props.auth)(SearchApp)} />

//<AuthenticationRoute path='/study' exact render={(props)=>{return React.createElement(Authorization(this.props.auth,'app')(SearchApp), null)}} />
//<AuthenticationRoute path='/study/:id' render={(props)=>{return React.createElement(Authorization(this.props.auth,props.match['params']['id'])(SearchApp), null)}} />