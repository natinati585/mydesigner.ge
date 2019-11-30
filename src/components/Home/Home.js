import React, {Component} from 'react';
import qs from 'qs'
import TranslateBox from "./translator/TranslateBox";
import T from "./translator/translate.js";
import TL from "./translator/changeLanguage";
import EventsManager from '../../eventsManager/EventsManager';
import Header from "./Header";
import Main from "./pages/Main";

const axios = require('axios').default;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currLanguage: 'ge',
            currPage: <Main/>
        }
    }

    componentDidMount() {
        // EventsManager.listen('changeLanguage', (language) => {
        //     console.log("must have been changed");
        //     this.setState({
        //         currLanguage: language
        //     });
        // })
    }

    homeStateChanger = (stateToChange, stateToChangeValue) => {
        this.setState({
            [stateToChange]: stateToChangeValue
        })
    };

    getPHP = async () => {
        let res = await axios.post('http://gamowere.ge/php/login.php', qs.stringify({
            'email': 'sofo',
            'password': 'sofosofo1234'
        }));

        console.log(res)
    };

    render() {
        // let windowUrl = window.location.href;
        // console.log(windowUrl);
        // console.log('home', this.state);

        // TL(this.state.language);

        return (
            <div>
                <Header homeState={this.homeStateChanger}/>
                <div className={'main-page'}>
                    {this.state.currPage}
                </div>
            </div>
        )
    }
}

export default Home;