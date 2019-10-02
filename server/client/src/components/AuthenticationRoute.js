import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class AuthenticationRoute extends React.Component {
     //if passed in's router props is component 
     render(){
        const { component: Component, ...rest } = this.props;
        //console.log(this.props);
        //console.log(this.props.auth === false || this.props.auth === null);
        return(
            <Route 
                {...rest} 
                render={(props) => (
                    this.props.auth === false
                  ? <Redirect to='/login' />
                  : <Component {...props} />
              )} />
        )
    }
    //if passed in's router props is render function
    /* render(){
        //console.log('Authenticate!');
        //console.log(this.props.auth);
        const { render: Render, ...rest } = this.props;
        return(
            <Route 
                {...rest} 
                render={(props) => (
                    this.props.auth === false
                  ? <Redirect to='/login' />
                  : Render(props)
              )} />
        )
    } */
}

/* const AuthRoute = ({ component: Component, auth: auth, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        (
            ((auth === false)) ? (
                <Redirect to="/login" />
            ) : (
                <Component {...props} />
            )
        )
      }
    />
  ); */

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(AuthenticationRoute);