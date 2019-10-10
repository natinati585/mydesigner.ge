import React, {Component} from 'react';
import qs from 'qs'
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
                <p>Home page</p>
            </div>
        )
    }
}

export default Home;