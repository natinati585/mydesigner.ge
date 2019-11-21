// import EventsManager from "../../../eventsManager/EventsManager";

class Translator {
    currLanguage = 'ge';

    translate(word) {
        if (word in this.translateData['en']) {
            return this.translateData[this.currLanguage][word];
        }
        else {
            for (let key in this.translateData) {
                this.translateData[key][word] = word;
            }
            return this.translateData[this.currLanguage][word];
        }
    }

    changeLanguage(language) {
        this.currLanguage = language;
        // EventsManager.fire('changeLanguage', language);
    }

    translateData = {
        'ge': {
            language: 'GE'
            ,SophieBostoghanashvili: 'სოფო ბოსტოღანაშვილი'
            ,ViewWorks: 'პორტფოლიო'
            ,Home: 'მთავარი'
            ,Projects: 'ნამუშევრები'
            ,Bio: 'ჩემს შესახებ'
            ,Contact: 'კონტაქტი'
        },
        'en': {
            language: 'EN'
            ,SophieBostoghanashvili: 'Sophie Bostoghanashvili'
            ,ViewWorks: 'Portfolio'
            ,Home: 'Home'
            ,Projects: 'Works'
            ,Bio: 'About me'
            ,Contact: 'Contact'
        },
        'ru': {
            language: 'RU'
            ,SophieBostoghanashvili: 'Софья Бостоганашвили'
            ,ViewWorks: 'Проекты'
            ,Home: 'Главная'
            ,Projects: 'Проекты'
            ,Bio: 'Обо мне'
            ,Contact: 'Контакт'
        }
    }
}

export default new Translator();