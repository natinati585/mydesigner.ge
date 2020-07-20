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

const axios = require('axios').default;

class Home extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            currLanguage: 'ge',
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <div className={'main-page'}>
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
                        </Switch>
                    </div>
                </div>

            </Router>
        )
    }
}

export default Home;