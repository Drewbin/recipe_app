import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Register extends Component {
    state = {
        email: '',
        password: '',
    }

    render() {
        return(
            <div>Register</div>
        )
    }
}