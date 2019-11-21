import React from 'react';
import './App.css';
import Home from './components/Home/Home'
import Admin from "./components/cms/Admin";
import {connect} from 'react-redux';
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            admin: false
        }
    }

    render() {
        let isAdmin = window.location.href.includes('/admin');

        console.log(this.props);

        return (
            <div className={"s-page-container"}>
                {
                    isAdmin ? <Admin/> : <Home/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(App);
