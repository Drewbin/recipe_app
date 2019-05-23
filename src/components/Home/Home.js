import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            randomList : [],
        };
    }

    componentWillMount() {
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(res => {
            this.setState({
                randomList : res.data,
            });
        });
    }

    render() {
        let random = this.state.randomList.map((recipe, index) => {
            return(
                <div key ={index}>
                    <h2></h2>
                </div>
            )
        })
        return (
            <div>
                <p>Home</p>
            </div>
        )
    }
}

export default connect(state => ({ randomList: state.randomList }))(Home);