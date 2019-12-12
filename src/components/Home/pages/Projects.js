import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import './projects.css';
import T from "../translator/translate";

class Projects extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            selectedData: []
        }
    }

    componentDidMount() {
        this._isMounted = true;

        this.selectData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    selectData = async () => {
        let formData = new FormData();
        formData.append('selectForFrontend', {formData: 'formData'});

        let selectedData = await axios.post('https://gamowere.ge/php/selectForFrontend.php', formData);

        let objectOfProjects = {};
        let data = [];
        let dataIndex = -1;

        for (let i = 1; i < selectedData.data.length; i++) {
            let dataI = selectedData.data[i];

            if (!(dataI.Projects_id in objectOfProjects)) {
                objectOfProjects[dataI.Projects_id] = [dataI.Images_id];
                data.push([dataI.Projects_id, dataI.Project_name, dataI.Project_description, dataI.Project_name_en, dataI.Project_description_en, dataI.Project_image_url, [dataI.Images_id, dataI.Image_description, dataI.Image_url]]);
                dataIndex += 1;
            } else {
                objectOfProjects[dataI.Projects_id].push(dataI.Images_id);
                data[dataIndex].push([dataI.Images_id, dataI.Image_description, dataI.Image_url]);
            }
        }
        this.setState({
            selectedData: data
        });
    };

    render() {
        return (
            <div>
                <div className={'projects-header-text-container'}>
                    <h1 className="header-text projects-header-text">{T('Projects')}</h1>
                </div>
                <div className={'projects-image-galleries-container'}>
                    {
                        this.state.selectedData.map((project, index) => {

                            const images = [
                                {
                                    original: project[5],
                                    thumbnail: project[5],
                                }
                            ];

                            for (let i = 6; i < project.length; i++) {
                                images.push(
                                    {
                                        original: project[i][2],
                                        thumbnail: project[i][2],
                                    }
                                );
                            }
                            console.log(images);

                            return (
                                <div key={index}
                                     className={'projects-image-gallery'}
                                     onClick={console.log('clicked')}>
                                    <ImageGallery
                                        showThumbnails={false}
                                        sizes={300}
                                        // showFullscreenButton={false}
                                        showPlayButton={false}
                                        items={images}/>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Projects);