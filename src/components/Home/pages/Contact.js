import React, {Component} from 'react';
import {connect} from "react-redux";
import Footer from "../Footer";
import './contact.css';
import T from "../translator/translate";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from "axios";

class Contact extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            phoneValue: '',
            successMessage: 0,
            successWaiting: 0
        }
    }

    componentDidMount() {
        this._isMounted = true;


    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    formCatcher = async (e) => {
        e.preventDefault();
        let formValues = {
            name: e.currentTarget.name.value,
            email: e.currentTarget.email.value,
            number: e.currentTarget.number.value,
            text: e.currentTarget.text.value
        };

        let formData = new FormData();
        formData.append('formValues', JSON.stringify({formValues: formValues}));

        this.setState({
            successWaiting: 1
        });

        let result = await axios.post('https://mydesigner.ge/php/sendToMail.php', formData);

        this.setState({
            successWaiting: 0,
            successMessage: 1
        });
        setTimeout(() => {
            this.setState({
                successMessage: 0
            });
        }, 3000);
    };


    render() {
        return (
            <div className={'contact'}>
                <div className={'contact-image'}>
                </div>
                <div className={'contact-inputs-container'}>
                    <h1 className={'header-text'}>
                        {/*{T('Contact')}*/}
                    </h1>
                    <div>
                        <form className={'contact-form'} onSubmit={this.formCatcher}>
                            <input type={'text'}
                                   placeholder={T('ContactUsNameInput')}
                                   name={"name"}
                                   className={'contact-input'}
                                   required/>
                            <input type={'email'}
                                   placeholder={T('ContactUsEmailInput')}
                                   name={"email"}
                                   className={'contact-input'}
                                   required/>
                            <PhoneInput
                                placeholder={T('ContactUsNumberInput')}
                                name={"number"}
                                value={this.state.phoneValue}
                                onChange={phoneValue => this.setState({phoneValue: phoneValue})}
                                className={'contact-number-input'}
                            />
                            <textarea rows={"2"}
                                      placeholder={T('ContactUsTextInput')}
                                      name={"text"}
                                      className={'contact-input'}
                                      required/>
                            <div className={'contact-submit-container'}>
                                <input type={'submit'}
                                       value={T('ContactUsSubmitButton')}
                                       className={'contact-submit sub-text'}/>
                            </div>
                            <label className={'success-waiting'}
                                   style={{opacity: this.state.successWaiting}}>{T('SuccessWaiting')}</label>
                            <label className={'success-message'}
                                   style={{opacity: this.state.successMessage}}>{T('SuccessMessage')}</label>
                        </form>
                    </div>
                </div>
                <div className={'contact-info-container'}>
                    <div className={'contact-info'}>
                        <table>
                            <tbody>
                            <tr>
                                <td className={'row-1'}>
                                    {T('SophieEmailLabel')}
                                </td>
                                <td>
                                    {T('SophieEmail')}
                                </td>
                            </tr>
                            <tr>
                                <td className={'row-1'}>
                                    {T('SophieNumberLabel')}
                                </td>
                                <td>
                                    {T('SophieNumber')}
                                </td>
                            </tr>
                            </tbody>
                        </table>
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

export default connect(mapStateToProps)(Contact);