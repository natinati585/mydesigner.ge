import React, {Component} from 'react';
import {connect} from "react-redux";

class Service extends React.Component{


    render() {
        return(
            <div>
                service page
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Service);