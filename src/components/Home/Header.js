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
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

export default class App extends React.Component {
    state = {
        current: window.location.pathname.split('/')[1] || 'main',
    };

    selectMenuItem = (e) => {
        this.setState({
            current: e.key
        })
    };

    render() {
        return (
            <div className={'header'}>
                <div>
                    <div className={'header-main-logo-container'}>
                        <div className={'header-main-logo'}></div>
                    </div>
                    <Menu
                        onClick={this.selectMenuItem}
                        selectedKeys={[this.state.current]} mode="horizontal"
                        className={'header-menu'}>

                        <Menu.Item key="main" className={'sub-text'}>
                            <Link to="/">{T('Home')}</Link>
                        </Menu.Item>
                        <Menu.Item key="about" className={'sub-text'}>
                            <Link to="/about">{T('Bio')}</Link>
                        </Menu.Item>
                        <Menu.Item key="projects" className={'sub-text'}>
                            <Link to="/projects">{T('Projects')}</Link>
                        </Menu.Item>
                        <Menu.Item key="contact" className={'sub-text'}>
                            <Link to="/contact">{T('Contact')}</Link>
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