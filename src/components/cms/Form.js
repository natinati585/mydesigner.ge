import {Form, Icon, Input, Button, Checkbox, Spin, Alert} from 'antd';
import React, {Component} from 'react';
import qs from "qs";

const axios = require('axios').default;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            loading: false,
            errors: {
                user: false,
                password: false,
                server: false
            }
        }
    }

    getPHP = async (data) => {
        let res = await axios.post('http://gamowere.ge/php/login.php', qs.stringify({
            'email': data['username'],
            'password': data['password']
        }));

        let newState = {
            loading: false,
            errors: {
                user: false,
                password: false,
                server: false
            }
        };

        if (res['data'].Code === '0') {
            console.log(res);
            this.props.stateGiver('authorised', true);
            return;
            //    redirect
        } else if (res['data'].Code === '111') {
            newState.errors.user = true;
        } else if (res['data'].Code === '112') {
            newState.errors.password = true;
        } else {
            console.log(res);
            newState.errors.server = true;
        }

        this.setState(newState);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getPHP(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {/*{getFieldDecorator('remember', {*/}
                    {/*    valuePropName: 'checked',*/}
                    {/*    initialValue: true,*/}
                    {/*})(<Checkbox>Remember me</Checkbox>)}*/}
                    {/*<a className="login-form-forgot" href="">*/}
                    {/*    Forgot password*/}
                    {/*</a>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    {/*Or <a href="">register now!</a>*/}
                </Form.Item>
                <div className="login-spin" style={{
                    display: this.state.loading ? "block" : "none"
                }}>
                    <Spin/>
                </div>
                <Alert message="Invalid username" type="error" style={{
                    display: this.state.errors.user ? "block" : "none"
                }}/>
                <Alert message="Invalid password" type="error" style={{
                    display: this.state.errors.password ? "block" : "none"
                }}/>
                <Alert message="Server error, retry" type="error" style={{
                    display: this.state.errors.server ? "block" : "none"
                }}/>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);
export default WrappedNormalLoginForm;



