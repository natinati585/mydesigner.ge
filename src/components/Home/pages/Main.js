import React, {Component} from 'react';
import {connect} from "react-redux";
import './main.css';
import ImagesAnimated from '../../imagesAnimated/ImagesAnimated'
import Footer from "../Footer";

class Main extends React.Component {
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const images = [
            {
                url: "https://loftic.ge/images/5db35a780a4e51.46802741.jpg",
            },
            {
                url: "https://loftic.ge/images/5db3550347eee1.51997745.jpg",
            },
            {
                url: "https://loftic.ge/images/5db3566145a0a5.23045795.jpg",
            },
            {
                url: "https://loftic.ge/images/5db357774c9d62.95486667.jpg",
            },
            {
                url: "https://loftic.ge/images/5db355393d82a8.41030101.jpg",
            },
            {
                url: "https://loftic.ge/images/5db356b62e65b8.93045071.jpg",
            },
            {
                url: "https://loftic.ge/images/5db354f85f2352.65801916.jpg",
            },
            {
                url: "https://loftic.ge/images/5db35b6a082883.68717077.jpg",
            },
        ];
        return (
            <div className={'main'}>
                {/*<ImagesAnimated imagesArray={images}/>*/}

                <div className={'main-background-image'}>
                </div>

                <div className={'main-footer-container'}>
                    <Footer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Main);