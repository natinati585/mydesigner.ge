import React, {Component} from 'react';
import LoginForm from './Form'
import 'antd/dist/antd.css';

class AdminLogin extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'admin-login-page-container'}>
                <div className={'admin-login-heading'}>
                    Hello Sophie ^^
                </div>
                <div className={'admin-login-form'}>
                    <LoginForm/>
                </div>
            </div>
        )
    }
}

export default AdminLogin;