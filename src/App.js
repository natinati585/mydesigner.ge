import React, {Component} from 'react';
import './App.css';
import Home from './components/Home/Home'
import Admin from "./components/cms/Admin";
import Form from './components/cms/Form'
import AdminLogin from "./components/cms/AdminLogin";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Admin/>
            </header>
        </div>
    );
}

export default App;
