import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Login from '../Login/Login';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        loading: false,
    };

    componentWillMount() {
        if (this.props.user) {
            this.props.history.push('/dashboard')
        }
    }

    handleChange(prop, val) {
        this.setState({
            [prop] : val,
        })
    }

    register = (e) => {
        e.preventDefault();

        this.setState({
            loading : true,
        });

        const { name, email, password } = this.state;

        axios.post('/register', { name, email, password }).then(res => {
            this.props.dispatch({ type: Login, payload: res.data.user });
            this.props.history.push('/dashboard');
        }).catch((err) => {
            console.error(err);
            this.setState({
                loading: false,
            });
        });
    }

    render() {
        return(
            <div>
                <h2> Register New User </h2>
                <div>
                    <div>
                        <p>Name: </p>
                        <input type='text'
                        value={this.state.name}
                        placeholder='Name...'
                        onChange={ (e) => this.handleChange('name', e.target.value)} />
                    </div>

                    <div>
                        <p>Email: </p>
                        <input type='text'
                        value={this.state.email}
                        placeholder='Email address...'
                        onChange={ (e) => this.handleChange('email', e.target.value)} />
                    </div>

                    <div>
                        <p>Password: </p>
                        <input type='password'
                        value={this.state.password}
                        placeholder="Password..."
                        onChange={ (e) => this.handleChange('password', e.target.value)} />
                    </div>
                </div>
                <button onclick={this.register} > Register </button>
                <p>
                    <Link to='/login'>Already a member? Click here to log in!</Link>
                </p>
            </div>
        )
    }
}

export default connect(state => ({ user: state.user }))(Register);