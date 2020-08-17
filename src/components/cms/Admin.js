import React from 'react';
import AdminLogin from "./AdminLogin";
import qs from "qs";
import AdminPage from "./adminPage/AdminPage";
import {Spin} from "antd";
import './admin.css';

const axios = require('axios').default;

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authorised: undefined
            // authorised: true
        }
    }

    componentDidMount() {
        this.checkSession();
    }

    checkSession = async () => {
        try {
            let res = await axios.post('https://loftic.ge/php/checkSession.php', qs.stringify({
                'checkSession': 'checkSession'
            }));

            if (res.data.Code === '0') {
                this.setState({
                    authorised: true
                });
            } else {
                this.setState({
                    authorised: false
                });
            }
        } catch (e) {
            console.log('checking error: ', JSON.stringify(e));
        }
    };

    stateGiver = (stateKey, stateValue) => {
        this.setState({
            [stateKey]: stateValue
        })
    };

    render() {
        if(this.state.authorised === undefined){
            return <Spin/>
        }
        let adminComponent = (
            <div>
                <AdminPage/>
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