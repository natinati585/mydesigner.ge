import React, {Component} from 'react';
import T from "./translator/translate";
import './translator/translate.css'
import 'antd/dist/antd.css';
import {Menu, Icon} from 'antd';
import TranslateBox from "./translator/TranslateBox";
import Main from "./pages/Main";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import './header.css';

const {SubMenu} = Menu;

export default class App extends React.Component {
    state = {
        current: 'main',
    };

    handleClick = e => {
        if (e.key === 'main') {
            this.props.homeState('currPage', <Main/>)
        }
        if (e.key === 'about') {
            this.props.homeState('currPage', <About homeState={this.props.homeState}/>)
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
        return (
            <div className={'header'}>
                <div>
                    <div className={'header-main-logo-container'}>
                        <div className={'header-main-logo'}></div>
                    </div>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"
                          className={'header-menu'}>
                        <Menu.Item key="main" className={'sub-text'}>
                            {T('Home')}
                        </Menu.Item>
                        <Menu.Item key="about" className={'sub-text'}>
                            {T('Bio')}
                        </Menu.Item>
                        <Menu.Item key="projects" className={'sub-text'}>
                            {T('Projects')}
                        </Menu.Item>
                        <Menu.Item key="contact" className={'sub-text'}>
                            {T('Contact')}
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