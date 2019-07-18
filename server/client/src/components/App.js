import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../history';

import Header from './Header';
import Landing from './Landing';

class App extends React.Component {

    render(){
        return (
            <div className="h-100">
                <Router history={history}>
                    <>
                        <Header />
                        <Switch>
                            <Route path='/' exact component={Landing} />
                        </Switch>
                    </>
                </Router>
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