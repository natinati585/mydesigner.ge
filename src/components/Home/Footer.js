import React, {Component} from "react";
import {Icon} from "antd";
import './footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className={'main-footer-relative'}>
                <div className={'footer-icons'}>
                    <div className={'footer-icon'}
                         onClick={() => {window.open("https://www.facebook.com/sopo.bostoghanashvili")}}>
                    </div>
                    <div className={'footer-icon'}
                         onClick={() => {window.open("https://www.instagram.com/sophie_bostoghanashvili/")}}>
                    </div>
                    <div className={'footer-icon'}
                         onClick={() => {window.open("https://www.instagram.com/sophie_bostoghanashvili/")}}>
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