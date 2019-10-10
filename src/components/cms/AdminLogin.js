import React from 'react';
import LoginForm from './AdminLoginForm'
import 'antd/dist/antd.css';

class AdminLogin extends React.Component {
    render() {
        return (
            <div className={'admin-login-page-container'}>
                <div className={'admin-login-heading'}>
                    Hello Sophie ^^
                </div>
                <div className={'admin-login-form'}>
                    <LoginForm  stateGiver = {this.props.stateGiver}/>
                </div>
            </div>
        )
    }
}

export default AdminLogin;