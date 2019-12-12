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
            ,Bio1: 'კარგი დიზაინერი წერს თქვენი ცხოვრების სცენარს: გიგეგმავთ გადაადგილების ტრაექტორიას ოთახებში, ' +
                'ფიქრობს, პირველად რა დაინახოთ დილით გაღვიძებისას, ან რა გარემო შეგიქმნათ საღამოს თქვენს საყვარელ' +
                ' სავარძელში დასვენებისას... რამდენადაც მოხერხებულად იქნება სივრცე ორგანიზებული, იმდენად ამაღლებული' +
                ' იქნება თქვენი განწყობა და ხასიათი'
            ,Bio2: 'ოცნების ინტერიერის შექმნისთვის აუცილებელია ურთიერთგაგება დამკვეთსა და დიზაინერს შორის'
            ,Bio3: 'მე მზად ვარ გავითვალისწინო ყველა თქვენი სურვილი, გავამთლიანო ერთიან კონცეფციაში და დავამატო საჭირო ' +
                'დეტალები იმისთვის, რომ შევქმნა თქვენი ცხოვრების იდეალური დიზაინი'

            ,Contact: 'დამეკონტაქტეთ'
            ,ContactUsNameInput: 'სახელი'
            ,ContactUsNumberInput: 'ტელეფონის ნომერი'
            ,ContactUsEmailInput: 'ელ. ფოსტა'
            ,ContactUsEmailVerificationLabel: 'გთხოვთ შეიყვანოთ მეილზე გამოგზავნილი კოდი'
            ,ContactUsEmailVerificationInput: '0000'
            ,ContactUsTextInput: 'მოკლედ გვიამბეთ პროექტის შესახებ'
            ,ContactUsSubmitButton: 'გაგზავნა'
            ,SuccessWaiting: 'მოითმინეთ... '
            ,SuccessMessage: 'შეკვეთა წარმატებით გაიგზავნა! '

            ,Service: 'მომსახურება'
        },
        'en': {
            language: 'EN'
            ,SophieBostoghanashvili: 'Sophie Bostoghanashvili'
            ,ViewWorks: 'Portfolio'
            ,Home: 'Home'
            ,Projects: 'Works'
            ,Bio: 'About me'
            ,Bio1: 'კარგი დიზაინერი წერს თქვენი ცხოვრების სცენარს: გიგეგმავთ გადაადგილების ტრაექტორიას ოთახებში, ' +
                'ფიქრობს, პირველად რა დაინახოთ დილით გაღვიძებისას, ან რა გარემო შეგიქმნათ საღამოს თქვენს საყვარელ ' +
                'სავარძელში დასვენებისას... რამდენადაც მოხერხებულად იქნება სივრცე ორგანიზებული, იმდენად ამაღლებული ' +
                'იქნება თქვენი განწყობა და ხასიათი'
            ,Bio2: 'ოცნების ინტერიერის შექმნისთვის აუცილებელია ურთიერთგაგება დამკვეთსა და დიზაინერს შორის'
            ,Bio3: 'მე მზად ვარ გავითვალისწინო ყველა თქვენი სურვილი, გავამთლიანო ერთიან კონცეფციაში და დავამატო საჭირო ' +
                'დეტალები იმისთვის, რომ შევქმნა თქვენი ცხოვრების იდეალური დიზაინი'

            ,Contact: 'Contact me'
            ,ContactUsNameInput: 'Name'
            ,ContactUsNumberInput: 'Phone number'
            ,ContactUsEmailInput: 'Email'
            ,ContactUsEmailVerificationLabel: 'Please enter the code sent to your email, dont forget to check spam'
            ,ContactUsEmailVerificationInput: '0000'
            ,ContactUsTextInput: 'Tell us about your project'
            ,ContactUsSubmitButton: 'Send'
            ,SuccessWaiting: 'Wait... '
            ,SuccessMessage: 'Information has been sent successfully! '

            ,Service: 'Service'
        }
    }
}

export default new Translator();