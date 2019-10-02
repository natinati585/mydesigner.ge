import React, {Component} from 'react';
import AdminLogin from "./AdminLogin";
import qs from "qs";

const axios = require('axios').default;

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authorised: false
        }
    }

    checkSession = async () => {
        let res = await axios.post('http://gamowere.ge/php/checkSession.php', qs.stringify({
            'checkSession': 'checkSession'
        }));

        console.log(res)
    };

    stateGiver = (stateKey, stateValue) => {
        this.setState({
            [stateKey]: stateValue
        })
    };

    render() {
        let user = false;

        let adminComponent = (
            <div>
                <p>just react</p>
                <button
                    onClick={this.checkSession}>
                    Load
                </button>
            </div>
        );
        let adminLogin = (
            <AdminLogin stateGiver={this.stateGiver}/>
        );

        return (
            <div>
                {this.state.authorised ? adminComponent : adminLogin}
            </div>
        )
    }
}

export default Admin;