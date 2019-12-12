import React, {Component} from 'react';
import qs from 'qs'
import Header from "./Header";
import Main from "./pages/Main";

const axios = require('axios').default;

class Home extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            currLanguage: 'ge',
            currPage: <Main/>
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
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