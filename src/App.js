import React from 'react';
import './App.css';
import Home from './components/Home/Home'
import Admin from "./components/cms/Admin";

import {connect} from 'react-redux';
import {updateLanguage} from "./reduxActions/language-actions";

class App extends React.Component {
    state;
    constructor(props) {
        super(props);

        this.state = {
            admin: false,
            language: 'en'
        };
    }

    forUpdateLanguage = () => {
        console.log(this.props);
        this.props.onUpdateLanguage(this.state.language);
    };

    render() {
        let isAdmin = window.location.href.includes('/admin');

        return (
            <div className={"s-page-container"}>
                {
                    isAdmin ? <Admin/> : <Home/>
                }
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
