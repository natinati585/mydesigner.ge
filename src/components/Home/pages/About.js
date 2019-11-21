import React, {Component} from 'react';
import TranslateBox from "../translator/TranslateBox";
import T from "../translator/translate.js";
import TL from "../translator/changeLanguage";
import EventsManager from '../../../eventsManager/EventsManager';

export default class About extends React.Component{


    render() {
        return(
            <div>
                about page
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p>{T("Home")}</p>
                <hr/>
                <TranslateBox homeState={this.props.homeState}/>
            </div>
        )
    }
}