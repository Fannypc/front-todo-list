import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import requireAuth from './utils/requireAuth';


const Routes = () => {
    return(
        <Switch>
            <Route exact path='/' component={requireAuth(Home)}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
        </Switch>
    )
}
export default Routes;