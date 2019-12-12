import React, {Component} from "react";
import './imagesAnimated.css';

class ImagesAnimated extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.animationDelay = this.props.animationDelay ? this.props.animationDelay : 4000;
        this.imagesArray = this.props.imagesArray ? this.props.imagesArray : ['empty images object'];

        this.state = {
            previousUrlIndex: 0,
        }
    }

    componentDidMount() {
        this._isMounted = true;

        let animate = setInterval(this.animator, this.animationDelay);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    animator = () => {
        let previousUrlIndex = (this.state.previousUrlIndex + 1) % this.imagesArray.length;

        if (this._isMounted) {
            this.setState({
                previousUrlIndex: previousUrlIndex,
            });
        }

    };

    render() {
        let {previousUrlIndex} = this.state;
        const width = this.props.width ? this.props.width : "100vw";
        const height = this.props.height ? this.props.height : "100vh";

        let previousUrl = this.imagesArray[this.state.previousUrlIndex];

        return (
            <div className={'images-animated-container'} style={{width: width, height: height}}>
                <div className={'images-animated'}>

                    {
                        this.imagesArray.map((img, i) => {
                            let className = "";
                            if (this.state.previousUrlIndex === i) {
                                className = "image-animated-previous";
                            } else if ((this.state.previousUrlIndex + 1) % this.imagesArray.length === i) {
                                className = "image-animated-current";
                            } else {
                                className = "image-animated-other"
                            }
                            return (
                                <img
                                    key={i}
                                    src={this.imagesArray[previousUrlIndex].url}
                                    className={className}
                                    style={{animationDuration: this.animationDelay + 'ms'}}
                                />
                            )
                        })
                    }


                    <div>

                    </div>
                    <div>
                        <img
                            key={previousUrlIndex}
                            src={this.imagesArray[(previousUrlIndex + 1) % 8].url}
                            className={'image-animated-current'}
                            style={{animationDuration: this.animationDelay + 'ms'}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ImagesAnimated;