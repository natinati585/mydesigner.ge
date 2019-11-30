import React, {Component} from 'react';
import TranslateBox from "../translator/TranslateBox";
import T from "../translator/translate.js";
import TL from "../translator/changeLanguage";
import EventsManager from '../../../eventsManager/EventsManager';
import {connect} from "react-redux";
import {updateLanguage} from "../../../reduxActions/language-actions";

class About extends React.Component {
    forUpdateUser = () => {
        console.log(this.props);
        this.props.onUpdateUser('Sammy');
    };
    render() {
        return (
            <div>
                about page
                <p>{T("Home")}</p>
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(About);