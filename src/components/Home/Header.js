import React, {Component} from 'react';
import T from "./translator/translate";
import TL from "./translator/changeLanguage";
import './translator/translate.css'
import 'antd/dist/antd.css';
import {Menu, Icon} from 'antd';
import TranslateBox from "./translator/TranslateBox";
import Main from "./pages/Main";
import About from "./pages/About";
import Service from "./pages/Service";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const {SubMenu} = Menu;

export default class App extends React.Component {
    state = {
        current: 'main',
    };

    handleClick = e => {
        console.log('click ', e);

        if (e.key === 'main') {
            this.props.homeState('currPage', <Main/>)
        }
        if (e.key === 'about') {
            this.props.homeState('currPage', <About homeState={this.props.homeState}/>)
        }
        if (e.key === 'service') {
            this.props.homeState('currPage', <Service/>)
        }
        if (e.key === 'projects') {
            this.props.homeState('currPage', <Projects/>)
        }
        if (e.key === 'contact') {
            this.props.homeState('currPage', <Contact/>)
        }

        this.setState({
            current: e.key,
        });
    };

    render() {
        // console.log('header');
        return (
            <div className={'header'}>
                <div className={'content-wrapper'}>
                    <div className={'header-main-logo-container'}>
                        <div className={'header-main-logo'}></div>
                    </div>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"
                          className={'header-menu'}>

                        <Menu.Item key="main">
                            მთავარი
                        </Menu.Item>
                        <Menu.Item key="about">
                            ჩვენ შესახებ
                        </Menu.Item>
                        <Menu.Item key="service">
                            მომსახურება
                        </Menu.Item>
                        <Menu.Item key="projects">
                            პროექტები
                        </Menu.Item>
                        <Menu.Item key="contact">
                            კონტაქტი
                        </Menu.Item>
                        <Menu.Item className={'header-menu-item-language'} key="language">
                            <TranslateBox homeState={this.props.homeState}/>
                        </Menu.Item>
                    </Menu>
                </div>


            </div>

        );
    }
}