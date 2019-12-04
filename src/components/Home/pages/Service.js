import React, {Component} from 'react';
import {connect} from "react-redux";

class Service extends React.Component {


    render() {
        return (
            <div>
                <div className={'service-content'}>
                    <div className={'service-image'}>

                    </div>
                    <div className={'service-flex-container'}>
                        <div className={'service-text-container'}>
                            <p className={'service-text'}>
                                <h1>მომსახურება</h1>
                                <p>
                                </p>
                                <div><strong> ჩვენი
                                    მომსახურეობა მოიცავს:</strong>
                        </div>
                        <p>✅ ადგილზე ვიზიტს, ობიექტის აზომვას და დასურათებას;</p>
                        <p>✅ შიდა ტიხრების დაგეგმარებას ნახაზების სახით;</p>
                        <p>✅ ავეჯის ზოგადი განლაგების გეგმარებას ზედხედში;</p>
                        <p>✅ დეტალურ 3D ვიზუალიზაციას და ესკიზების მომზადებას;</p>
                        <p>✅ საპროექტო ნახაზების მომზადებას (სანტექნიკა, ელექტროობა, ჭერი);</p>
                        <p>✅ სარემონტო და ავეჯის მასალების ერთობლივ შერჩევას;</p>
                        <p>✅ რემონტის პროცესზე მეთვალყურეობას.</p>
                    </p>
                </div>
                <div>
                </div>
            </div>
    </div>
    </div>
    )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(Service);