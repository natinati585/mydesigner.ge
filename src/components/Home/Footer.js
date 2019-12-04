import React, {Component} from "react";
import {Icon} from "antd";

export default class Footer extends React.Component {
    render() {
        return (
            <div className={'main-footer-relative'}>
                <div className={'footer-icons'}>
                    <div className={'footer-icon'}>
                    </div>
                    <div className={'footer-icon'}>
                    </div>
                    <div className={'footer-icon'}>
                    </div>
                    {/*<Icon type="instagram" style={{fontSize: '27px', marginRight: '20px'}}/>*/}
                    {/*<Icon type="facebook" style={{fontSize: '27px'}}/>*/}
                </div>
                <div className={'footer-copyright'}>
                    ©2019 - Mydesigner.ge
                </div>
            </div>
        )
    }
}