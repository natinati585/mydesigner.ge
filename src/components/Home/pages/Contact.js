import React, {Component} from 'react';
import {connect} from "react-redux";

class Contact extends React.Component{


    render() {
        return(
            <div>
                contact page
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Contact);