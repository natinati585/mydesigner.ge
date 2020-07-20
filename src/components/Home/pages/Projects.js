import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import './projects.css';
import T from "../translator/translate";
import Footer from "../Footer";
import classNames from 'classnames';

class Projects extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            selectedData: []
        };

    }

    async componentDidMount() {
        this._isMounted = true;


        await this.selectData();

        if (this.props.match.params.projectId) {
            this['gallery' + this.props.match.params.projectId].current.fullScreen();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    selectData = async () => {
        let formData = new FormData();
        formData.append('selectForFrontend', {formData: 'formData'});

        let selectedData = await axios.post('https://mydesigner.ge/php/selectForFrontend.php', formData);

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

        data.forEach((project, index) => {
            let galleryName = 'gallery' + project[0];

            if (!this[galleryName]) {
                this[galleryName] = React.createRef();
            }
        });

        this.setState({
            selectedData: data
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.match.params.projectId !== nextProps.match.params.projectId) {
            this['gallery' + this.props.match.params.projectId].current.exitFullScreen();
            if (nextProps.match.params.projectId) {
                this['gallery' + nextProps.match.params.projectId].current.fullScreen();
            }
        } else if (
            this.props.match.params.imageId !== nextProps.match.params.imageId
        ) {
            if (nextProps.match.params.projectId) {
                this['gallery' + nextProps.match.params.projectId].current.slideToIndex(nextProps.match.params.imageId);
            }
        }
    }

    render() {

        const {projectId, imageId} = this.props.match.params;

        return (
            <div>
                <div className={'projects-header-text-container'}>
                    {/*<h1 className="header-text projects-header-text">{T('Projects')}</h1>*/}
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

                            let galleryName = 'gallery' + project[0];

                            const imageId = this.props.match.params.imageId;
                            let currentIndex = imageId ? Number.parseInt(imageId) : 0;
                            return (
                                <div
                                    key={index}
                                    className={'projects-image-gallery-with-text-container'}
                                    onKeyDown={(e) => {
                                        if (!this.props.match.params.projectId) return;
                                        if (e.keyCode === 37) {

                                            let nextIndex = (currentIndex - 1 + images.length) % images.length;
                                            this.props.history.push(`/projects/${project[0]}/${nextIndex}`);
                                        } else if (e.keyCode === 39) {
                                            let currentIndex = imageId ? Number.parseInt(imageId) : 0;
                                            let nextIndex = (currentIndex + 1) % images.length;
                                            this.props.history.push(`/projects/${project[0]}/${nextIndex}`);
                                        }
                                    }}
                                >
                                    <div
                                        className={'projects-image-gallery'}>
                                        <ImageGallery
                                            onScreenChange={(isFullscreen, e) => {
                                                if (!isFullscreen) {
                                                    this.props.history.push('/projects')
                                                }
                                            }}
                                            disableSwipe
                                            disableKeyDown
                                            ref={this[galleryName]}
                                            onClick={(e) => {
                                                if (!projectId) {
                                                    let src = e.target.getAttribute("src");
                                                    let clickedIndex = images.indexOf(images.find(c => c.original === src));
                                                    this.props.history.push(`/projects/${project[0]}/${clickedIndex}`);
                                                } else {
                                                    this.props.history.push('/projects')
                                                }
                                            }}
                                            showThumbnails={false}
                                            sizes={300}
                                            // showFullscreenButton={false}
                                            startIndex={currentIndex || 0}

                                            renderLeftNav={projectId ? (onClick, disabled) => {
                                                return (
                                                    <button
                                                        className={
                                                            classNames({
                                                                'image-gallery-left-nav': true,
                                                                'image-gallery-icon': true
                                                            })
                                                        }
                                                        disabled={disabled}
                                                        onClick={() => {
                                                            if (this.props.match.params.projectId) {
                                                                let currentIndex = imageId ? Number.parseInt(imageId) : 0;
                                                                let nextIndex = (currentIndex - 1 + images.length) % images.length;
                                                                this.props.history.push(`/projects/${project[0]}/${nextIndex}`);
                                                            }
                                                        }}>
                                                        <svg className="image-gallery-svg"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="6 0 12 24"
                                                             fill="none" stroke="currentColor" strokeWidth="1"
                                                             strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="15 18 9 12 15 6"></polyline>
                                                        </svg>
                                                    </button>
                                                )
                                            } : undefined}

                                            renderRightNav={projectId ? (onClick, disabled) => {
                                                return (
                                                    <button
                                                        className={
                                                            classNames({
                                                                'image-gallery-right-nav': true,
                                                                'image-gallery-icon': true
                                                            })
                                                        }
                                                        disabled={disabled}
                                                        onClick={() => {
                                                            if (this.props.match.params.projectId) {
                                                                let currentIndex = imageId ? Number.parseInt(imageId) : 0;
                                                                let nextIndex = (currentIndex + 1) % images.length;
                                                                this.props.history.push(`/projects/${project[0]}/${nextIndex}`);
                                                            }
                                                        }}>
                                                        <svg className="image-gallery-svg"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="6 0 12 24"
                                                             fill="none" stroke="currentColor" strokeWidth="1"
                                                             strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </button>
                                                )
                                            } : undefined}

                                            showPlayButton={false}
                                            items={images}
                                            useBrowserFullscreen={false}

                                        />
                                        <div className={'project-description-container-in-box'}>
                                            <p>
                                                {
                                                    this.props.language === 'ge' ? project[2] : project[3]
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    {/*<div className={'project-description-container'}>*/}
                                    {/*    <p>*/}
                                    {/*        {project[2]}*/}
                                    {/*    </p>*/}
                                    {/*</div>*/}
                                </div>
                            )
                        })}
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Projects);