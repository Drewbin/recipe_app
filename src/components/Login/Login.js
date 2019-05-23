import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { login } from '../../ducks/reducer';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        });
    }

    login = (e) => {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        const { email, password } = this.state;

        axios.post('/login', { email, password }).then(res => {
            this.props.dispatch({ type: login, payload: res.data.user });
            this.props.history.push('/dashboard')
        }).catch(err => {
            console.error(err);
            this.setState({
                loading: false,
            })
            this.props.history.push('/login')
        })
    }

    render() {
        return(
            <div>
                <h2>Member Login</h2>
                <div>
                    <div>
                        <p>Email: </p>
                        <input type='text'
                        value={this.state.email} 
                        placeholder="Email address..." 
                        onChange={ (e) => this.handleChange('email', e.target.value)} />
                    </div>

                    <div>
                        <p>Password: </p>
                        <input type ='password'
                        value={this.state.password}
                        placeholder="Password..."
                        onChange={ (e) => this.handleChange('password', e.target.value)} />
                    </div>
                </div>
                <button onClick={this.login} > Login </button>
                <Link to='/register'>
                    <button> Register </button>
                </Link>
            </div>
        )
    }
}

export default connect(state => ({ user: state.user }))(Login);