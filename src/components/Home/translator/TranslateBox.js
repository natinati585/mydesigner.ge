import React, {Component} from 'react';
import TL from "./changeLanguage";
import './translate.css'
import 'antd/dist/antd.css';
import {Menu, Icon, Button} from 'antd';
import {connect} from "react-redux";
import {updateLanguage} from "../../../reduxActions/language-actions";

const {SubMenu} = Menu;

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            language: 'ge'
        }
    }


    forUpdateLanguage = (newLanguage) => {
        this.props.onUpdateLanguage(newLanguage);
    };

    render() {
        return (
            <div className={'header-translator'}>
                <Button className={'antd-button-style'} onClick={() => {
                    TL('ge');
                    this.forUpdateLanguage('ge');
                }}>GEO</Button>
                <Button className={'antd-button-style'} onClick={() => {
                    TL('en');
                    this.forUpdateLanguage('en');
                }}>ENG</Button>
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

const mapActionsToProps = {
    onUpdateLanguage: updateLanguage
};

export default connect(mapStateToProps, mapActionsToProps)(App);