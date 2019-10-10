import React from 'react';
import './App.css';
import Home from './components/Home/Home'
import Admin from "./components/cms/Admin";

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            admin: false
        }
    }
    render(){
        let isAdmin = window.location.href.includes('/admin');

        return (
            <div className={"s-page-container"}>
                {/*<header className="App-header">*/}
                {/*    <Admin/>*/}
                {/*</header>*/}
                {
                    isAdmin ? <Admin/> : <Home/>
                }
            </div>
        );
    }
}

export default App;
