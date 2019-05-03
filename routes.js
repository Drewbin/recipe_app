import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './src/components/Dashboard/Dashboard';
import Login from './src/components/Login/Login';
import Register from './src/components/Register/Register';
import RecipeList from './src/components/RecipeList/RecipeList';
import RecipeDetail from './src/components/RecipeDetail/RecipeDetail';


export default (

    <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/recipes' component={RecipeList} />
        <Route path='/recipes/:id' component={RecipeDetail} />
        
        <Redirect to='/recipes' />
    </Switch>
)