import React, {Component} from 'react';
import {connect} from "react-redux";
import './main.css';
import ImagesAnimated from '../../imagesAnimated/ImagesAnimated'

class Main extends React.Component {

    render() {
        const images = [
            {
                url: "https://gamowere.ge/images/5db35a780a4e51.46802741.jpg",
            },
            {
                url: "https://gamowere.ge/images/5db3550347eee1.51997745.jpg",
            },
            {
                url: "https://gamowere.ge/images/5db3566145a0a5.23045795.jpg",
            },
            {
                url: "https://gamowere.ge/images/5db357774c9d62.95486667.jpg",
            },
            {
                url: "https://gamowere.ge/images/5db355393d82a8.41030101.jpg",
            },
            {
                url: "https://gamowere.ge/images/5db356b62e65b8.93045071.jpg",
            },
            {
                url: "https://gamowere.ge/images/5db354f85f2352.65801916.jpg",
            },
            {
                url: "https://gamowere.ge/images/5db35b6a082883.68717077.jpg",
            },
        ];

        return (
            <div>
                {/*<ImageGallery*/}
                {/*    items={images}*/}
                {/*    showThumbnails={false}*/}
                {/*    showNav={false}*/}
                {/*    showFullscreenButton={false}*/}
                {/*    showPlayButton={false}*/}
                {/*    autoPlay={true}*/}
                {/*    slideDuration={1000}*/}
                {/*    slideInterval={5000}*/}
                {/*    onImageLoad = {(e) => {*/}
                {/*        // console.log('onslide ', e.currentTarget);*/}
                {/*        // e.currentTarget.classList.add('image-gallery-slide-animation')*/}
                {/*    }}*/}
                {/*/>*/}
                <ImagesAnimated imagesArray={images}/>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Main);