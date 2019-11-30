import React, {Component} from 'react';
import {connect} from "react-redux";

class Projects extends React.Component{


    render() {
        return(
            <div>
                projects page
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Projects);