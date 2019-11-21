import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

export default class Main extends React.Component {

    render() {
        const images = [
            {
                original: 'https://gamowere.ge/images/5db35a780a4e51.46802741.jpg',
                // thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
                original: 'https://gamowere.ge/images/5db3550347eee1.51997745.jpg',
                thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
                original: 'https://gamowere.ge/images/5db3566145a0a5.23045795.jpg',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
            {
                original: 'https://gamowere.ge/images/5db357774c9d62.95486667.jpg',
                thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
                original: 'https://gamowere.ge/images/5db355393d82a8.41030101.jpg',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
            {
                original: 'https://gamowere.ge/images/5db356b62e65b8.93045071.jpg',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
            {
                original: 'https://gamowere.ge/images/5db354f85f2352.65801916.jpg',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
            {
                original: 'https://gamowere.ge/images/5db35b6a082883.68717077.jpg',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
        ];

        return (
            <div>
                <ImageGallery
                    items={images}
                    showThumbnails={false}
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    autoPlay={true}
                    slideDuration={1000}
                    slideInterval={5000}
                />
            </div>
        )
    }
}