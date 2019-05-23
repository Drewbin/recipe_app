import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
//import Home from './components/Home/Home';


export default (

    <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/recipes' component={RecipeList} />
        <Route path='/recipes/:id' component={RecipeDetail} />

        <Redirect to='/login' />
    </Switch>
)