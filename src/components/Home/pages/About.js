import React, {Component} from 'react';
import TranslateBox from "../translator/TranslateBox";
import T from "../translator/translate.js";
import TL from "../translator/changeLanguage";
import EventsManager from '../../../eventsManager/EventsManager';
import {connect} from "react-redux";
import {updateLanguage} from "../../../reduxActions/language-actions";
import Footer from "../Footer";

class About extends React.Component {
    forUpdateUser = () => {
        console.log(this.props);
        this.props.onUpdateUser('Sammy');
    };

    render() {
        return (
            <div>
                <div className={'about-us-content'}>
                    <div className={'about-us-image'}>

                    </div>
                    <div className={'about-us-flex-container'}>
                        <div>
                        </div>
                        <div className={'about-us-text-container'}>
                            <p className={'about-us-text'}>
                                <h1>ჩვენს შესახებ</h1>
                                <p>ჩვენი გუნდი ქმნის ინტერიერის დიზანს და ანხორციელებს საპროექტო და არქიტექტურულ
                                მომსახურეობას როგორც საცხოვრებელი, ასევე საოფისე, სავაჭრო და კომერციული
                                ფართებისთვის.</p>
                                <h5><strong><span className="&quot;_4yxo&quot;">&nbsp; &nbsp;ჩვენი დიზაინ-პროექტი ითვალისწინებს:&nbsp;&nbsp;</span></strong>
                                </h5>
                                <p>◾ ობიექტის რაციონალურად ზონირებას;</p>
                                <p>◾ ინტერიერის არა მხოლოდ ვიზუალურად დახვეწას, არამედ მის ერგონომიკულ გამართულობას
                                    და მორგებას დამკვეთის ინტერესებთან;</p>
                                <p>◾ ვიზუალიზაციის უმაღლეს, რეალისტურ სახეს;</p>
                                <p>◾ ტექნიკურად გამართულ სამუშაო ნახაზებს;&nbsp;</p>
                                <p>◾ პრაქტიკულად შესრულებად სარემონტო, ავეჯის მოწყობის და სხვა სამუშაოებს - რეალური,
                                    ხელმისაწვდომი მასალებით.</p>    <p></p>
                            </p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    language: storeState.language
});

export default connect(mapStateToProps)(About);