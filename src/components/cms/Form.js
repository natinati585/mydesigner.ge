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
        this.getPHP = this.getPHP.bind(this);
    }

    async getPHP(data) {
        let res = await axios.post('http://gamowere.ge/php/login.php', qs.stringify({
            'email': data['username'],
            'password': data['password']
        }));
        document.getElementsByClassName('login-spin')[0].style.display = 'none';
        if(res['data'].Code === '0'){
            document.getElementsByClassName('login-error')[0].style.display = 'none';
            document.getElementsByClassName('login-error')[1].style.display = 'none';
            console.log(res);
        //    redirect
        }
        else if(res['data'].Code === '111'){
            document.getElementsByClassName('login-error')[0].style.display = 'block';
        }
        else if(res['data'].Code === '112'){
            document.getElementsByClassName('login-error')[0].style.display = 'none';
            document.getElementsByClassName('login-error')[1].style.display = 'block';
        }else{
            console.log(res);
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        document.getElementsByClassName('login-spin')[0].style.display = 'block';
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
                <div className="login-spin">
                    <Spin/>
                </div>
                <Alert className={"login-error"} message="Invalid username" type="error" />
                <Alert className={"login-error"} message="Invalid password" type="error" />
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);
export default WrappedNormalLoginForm;



