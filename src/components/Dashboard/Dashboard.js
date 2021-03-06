import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Header/Header';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: [],
        }
    }

    handleChange = ( prop, val ) => {
        this.setState({ [prop] : val })
    }

    componentDidMount = () => {
         axios.get('https://api.edamam.com/search?q=chicken&app_id=58567878&app_key=e8e7596c45b1de7bece04fd4ee091883&from=0&to=3').then(res => {
             console.log(res);
         })
    }

    render(){
        return(
            <div>
                Dashboard
            </div>
        )
    }
}




// https://api.edamam.com/search?q=chicken&app_id=58567878&app_key=e8e7596c45b1de7bece04fd4ee091883&from=0&to=3

// https://www.themealdb.com/api/json/v1/1/random.php