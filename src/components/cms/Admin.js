import React, {Component} from 'react';
import AdminLogin from "./AdminLogin";
import qs from "qs";

const axios = require('axios').default;

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.checkSession = this.checkSession.bind(this);
    }

    async checkSession() {
        let res = await axios.post('http://gamowere.ge/php/checkSession.php', qs.stringify({
            'checkSession': 'checkSession'
        }));

        console.log(res)
    }

    render() {
        let user = false;

        return (
            <div>
                <p>just react</p>
                <button
                    onClick={this.checkSession}>
                    Load
                </button>
            </div>
        )
    }
}

export default Admin;