import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {fetchUser} from '../actions';
import Header from './Header';
import Landing from './Landing';
import Admin from './Admin/Admin';
import ProjectAdmin from './Admin/Project/ProjectAdmin';
import ProjectAdminNew from './Admin/Project/ProjectAdminNew';
import ProjectAdminEdit from './Admin/Project/ProjectAdminEdit';
import DictAdmin from './Admin/Dict/DictAdmin';
import DictAdminNew from './Admin/Dict/DictAdminNew';
import DictAdminEdit from './Admin/Dict/DictAdminEdit';
import ProjItemDictAdminEdit from './Admin/Project/ProjItemDict/ProjItemDictAdminEdit';
import TakeForm from './Take/TakeForm';
import BrowseForm from './Browse/BrowseForm';
import UserAdmin from './Admin/User/UserAdmin';
import UserAdminEdit from './Admin/User/UserAdminEdit';
import UserAdminNew from './Admin/User/UserAdminNew';
import Login from './Login';
import LoginLocal from './LoginLocal';
import UserPreferenceEdit from './UserPreference/UserPreferenceEdit';
import TakeResult from './Take/TakeResult';

class App extends React.Component {

    async componentDidMount(){
        await this.props.fetchUser();
    }

    render(){
        return (
            <div className="h-100">
                <Router history={history}>
                    <>
                        <Header />
                        <Switch>
                            <Route path='/' exact component={Landing} />
                            <Route path='/admin' exact component={Admin} />
                            <Route path='/admin/projs' exact component={ProjectAdmin} />
                            <Route path='/admin/proj/new' exact component={ProjectAdminNew} />
                            <Route path='/admin/proj/:id' exact component={ProjectAdminEdit}  />
                            <Route path='/admin/dicts' exact component={DictAdmin} />
                            <Route path='/admin/dict/new' exact component={DictAdminNew} />
                            <Route path='/admin/dict/:id' exact component={DictAdminEdit}  />
                            <Route path='/admin/projItemDict/:projItemId' exact component={ProjItemDictAdminEdit} />
                            <Route path='/take/new' exact component={TakeForm} />
                            <Route path='/browse' exact component={BrowseForm} />
                            <Route path='/admin/users' exact component={UserAdmin} />
                            <Route path='/admin/user/new' exact component={UserAdminNew} />
                            <Route path='/admin/user/:upn' exact component={UserAdminEdit} />
                            <Route path='/login' exact component={Login} />
                            <Route path='/login/local' exact component={LoginLocal} />
                            <Route path='/user' exact component={UserPreferenceEdit} />
                            <Route path='/take/result' exact component={TakeResult} />
                        </Switch>
                    </>
                </Router>
                <ToastContainer autoClose={1000}/>
            </div>
            );
    }
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps,{fetchUser})(App);
// <AuthenticationRoute path='/study' exact component={Authorization(this.props.auth,'app')(SearchApp)} />
//<AuthenticationRoute path='/study/:id' component={AuthMatch(this.props.auth)(SearchApp)} />

//<AuthenticationRoute path='/study' exact render={(props)=>{return React.createElement(Authorization(this.props.auth,'app')(SearchApp), null)}} />
//<AuthenticationRoute path='/study/:id' render={(props)=>{return React.createElement(Authorization(this.props.auth,props.match['params']['id'])(SearchApp), null)}} />