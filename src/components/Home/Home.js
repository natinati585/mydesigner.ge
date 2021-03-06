import React, {Component} from 'react';
import qs from 'qs'
import Header from "./Header";
import Main from "./pages/Main";
import Footer from "./Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import './home.css';

const axios = require('axios').default;

class Home extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            currLanguage: 'ge',
            mainPage: true
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return this.state.mainPage ? (
                <Router>
                    <div>
                        <Header/>
                        <div className={'home'}>
                            <Switch>
                                <Route exact path="/">
                                    <Main/>
                                </Route>
                                <Route path="/about">
                                    <About/>
                                </Route>
                                <Route
                                    exact
                                    path="/projects" component={(props) =>
                                    <Projects {...props} />}
                                />
                                <Route
                                    path="/projects/:projectId/:imageId" component={(props) => <Projects {...props} />}
                                />
                                <Route path="/contact">
                                    <Contact/>
                                </Route>
                                <Route path="/photo-for-social-media-sharing.JPG">
                                    <img src={"./photo-for-social-media-sharing.JPG"}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>

                </Router>
            )
            :
            (
                <div className={'home-temp-page'} onClick={() => {
                    this.setState({mainPage: true})
                }}>
                    <div className={'home-temp-background-color'}>
                        <div className={'main-big-logo'}>

                        </div>
                    </div>
                </div>
            )
    }
}

export default Home;