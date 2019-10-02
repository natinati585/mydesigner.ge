import React, {Component} from 'react';
import qs from 'qs'
// import 'whatwg-fetch';
const axios = require('axios').default;

class Home extends Component {
    constructor(props) {
        super(props);
        this.getPHP = this.getPHP.bind(this);
    }

    async getPHP() {
        let res = await axios.post('http://gamowere.ge/php/login.php', qs.stringify({
            'email': 'sofo',
            'password': 'sofosofo1234'
        }));

        console.log(res)
    }

    render() {
        return (
            <div>
                <p>just react</p>
                <button
                    onClick={this.getPHP}>
                    Load
                </button>
            </div>
        )
    }
}

export default Home;