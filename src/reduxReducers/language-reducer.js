import {UPDATE_LANGUAGE} from '../reduxActions/language-actions';

export default function languageReducer(state='', {type, payload}) {
    switch (type) {
        case UPDATE_LANGUAGE:
            return payload.language;
        default:
            return state;
    }
}