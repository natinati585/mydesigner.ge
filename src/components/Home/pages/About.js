import React, {Component} from 'react';
import TranslateBox from "../translator/TranslateBox";
import T from "../translator/translate.js";
import TL from "../translator/changeLanguage";
import EventsManager from '../../../eventsManager/EventsManager';
import {connect} from "react-redux";
import {updateLanguage} from "../../../reduxActions/language-actions";
import Footer from "../Footer";
import './about.css';

class About extends React.Component {
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    forUpdateUser = () => {
        console.log(this.props);
        this.props.onUpdateUser('Sammy');
    };

    render() {
        return (
            <div>
                <div className={'about-us-content'}>
                    <div className={'about-us-image'}>

                    </div>
                    <div className={'about-us-flex-container'}>
                        <div>
                        </div>
                        <div className={'about-us-text-container'}>
                            <div className={'about-us-text'}>
                                <h1 className={'header-text'}>
                                    {/*{T('Bio')}*/}
                                </h1>
                                <div>
                                    <h6 className={'simple-text text-color'}>
                                        &emsp;
                                        {
                                            T('Bio1')
                                        }</h6>
                                </div>
                                <div>
                                    <h6 className={'simple-text text-color'}>
                                        &emsp;
                                        {
                                            T('Bio2')
                                        }</h6>
                                </div>
                                <div>
                                    <h6 className={'simple-text text-color'}>
                                        &emsp;
                                        {
                                            T('Bio3')
                                        }</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(About);