import React, {Component} from 'react';
import TL from "./changeLanguage";
import './translate.css'
import 'antd/dist/antd.css';
import {Menu, Icon, Button} from 'antd';

const {SubMenu} = Menu;

export default class App extends React.Component {
    render() {
        return (
            <div className={'header-translator'}>
                <Button className={'antd-button-style'} onClick={() => {
                    TL('ge');
                    this.props.homeState('currLanguage', 'ge');
                }}>GEO</Button>
                <Button className={'antd-button-style'} onClick={() => {
                    TL('en');
                    this.props.homeState('currLanguage', 'en');
                }}>ENG</Button>
            </div>
        );
    }
}
// export default class TranslateBox extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             language: 'ge',
//             current: 'mail',
//         }
//     }
//
//     handleClick = (e) => {
//
//     };
//
//     render() {
//
//         return (
//             <div>
//                 <menu>
//                     <Menu.Item>Menu</Menu.Item>
//                     <SubMenu title="SubMenu">
//                         <Menu.Item>SubMenuItem</Menu.Item>
//                     </SubMenu>
//                 </menu>
//                 <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
//                     <Menu.Item key="mail">
//                         <Icon type="mail"/>
//                         Navigation One
//                     </Menu.Item>
//                     <Menu.Item key="app" disabled>
//                         <Icon type="appstore"/>
//                         Navigation Two
//                     </Menu.Item>
//                     <SubMenu
//                         title={
//                             <span className="submenu-title-wrapper">
//               <Icon type="setting"/>
//               Navigation Three - Submenu
//             </span>
//                         }
//                     >
//                         <Menu.ItemGroup title="Item 1">
//                             <Menu.Item key="setting:1">Option 1</Menu.Item>
//                             <Menu.Item key="setting:2">Option 2</Menu.Item>
//                         </Menu.ItemGroup>
//                         <Menu.ItemGroup title="Item 2">
//                             <Menu.Item key="setting:3">Option 3</Menu.Item>
//                             <Menu.Item key="setting:4">Option 4</Menu.Item>
//                         </Menu.ItemGroup>
//                     </SubMenu>
//                     <Menu.Item key="alipay">
//                         <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//                             Navigation Four - Link
//                         </a>
//                     </Menu.Item>
//                 </Menu>
//                 {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>*/}
//                 {/*    lang*/}
//                 {/*</Button>*/}
//                 {/*<Menu*/}
//                 {/*    id="lang-menu"*/}
//                 {/*    anchorEl={anchorEl}*/}
//                 {/*    keepMounted*/}
//                 {/*    open={Boolean(anchorEl)}*/}
//                 {/*    onClose={this.handleClose}*/}
//                 {/*>*/}
//                 {/*    <MenuItem onClick={this.handleClose}>English</MenuItem>*/}
//                 {/*    <MenuItem onClick={this.handleClose}>ქართული</MenuItem>*/}
//                 {/*    <MenuItem onClick={this.handleClose}>Русский</MenuItem>*/}
//                 {/*</Menu>*/}
//             </div>
//         )
//     }
// };