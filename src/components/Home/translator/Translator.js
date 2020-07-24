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
            ,Projects: 'პროექტები'
            ,Bio: 'ჩემ შესახებ'
            ,Bio1: 'კარგი დიზაინერი წერს თქვენი ცხოვრების სცენარს: გიგეგმავთ გადაადგილების ტრაექტორიას ოთახებში, ' +
                'ფიქრობს, პირველად რა დაინახოთ დილით გაღვიძებისას, ან რა გარემო შეგიქმნათ საღამოს თქვენს საყვარელ' +
                ' სავარძელში დასვენებისას... რამდენადაც მოხერხებულად იქნება სივრცე ორგანიზებული, იმდენად ამაღლებული' +
                ' იქნება თქვენი განწყობა და ხასიათი'
            ,Bio2: 'ოცნების ინტერიერის შექმნისთვის აუცილებელია ურთიერთგაგება დამკვეთსა და დიზაინერს შორის'
            ,Bio3: 'მე მზად ვარ გავითვალისწინო ყველა თქვენი სურვილი, გავამთლიანო ერთიან კონცეფციაში და დავამატო საჭირო ' +
                'დეტალები იმისთვის, რომ შევქმნა თქვენი ცხოვრების იდეალური დიზაინი'

            ,Contact: 'კონტაქტი'
            ,ContactUsNameInput: 'სახელი'
            ,ContactUsNumberInput: 'ტელეფონის ნომერი'
            ,ContactUsEmailInput: 'ელ. ფოსტა'
            ,ContactUsEmailVerificationLabel: 'გთხოვთ შეიყვანოთ მეილზე გამოგზავნილი კოდი'
            ,ContactUsEmailVerificationInput: '0000'
            ,ContactUsTextInput: 'მოკლედ გვიამბეთ პროექტის შესახებ'
            ,ContactUsSubmitButton: 'გაგზავნა'
            ,SuccessWaiting: 'მოითმინეთ... '
            ,SuccessMessage: 'შეკვეთა წარმატებით გაიგზავნა! '

            ,SophieEmailLabel: 'ელ.ფოსტა: '
            ,SophieEmail: 'Sophie@mydesigner.ge'
            ,SophieNumberLabel: 'ნომერი: '
            ,SophieNumber: '+995 591 22 95 59'

            ,Service: 'მომსახურება'
        },
        'en': {
            language: 'EN'
            ,SophieBostoghanashvili: 'Sophie Bostoghanashvili'
            ,ViewWorks: 'Portfolio'
            ,Home: 'Home'
            ,Projects: 'Projects'
            ,Bio: 'About me'
            ,Bio1: 'A good designer writes your life story: planning the trajectory of your movement in the rooms, ' +
                'thinking about what you see for the first time in the morning, ' +
                'or what environment to create for you while relaxing in your favorite armchair in the evening...   ' +
                'As space is conveniently organized, your mood and character will be elevated.'
            ,Bio2: 'Creating a dream interior requires a good understanding between the customer and the designer'
            ,Bio3: 'I am ready to take into consideration all your wishes, to unite them in the concept and add the necessary details ' +
                'in order to create the ideal design for your life'

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

            ,SophieEmailLabel: 'Email: '
            ,SophieEmail: 'Sophie@mydesigner.ge'
            ,SophieNumberLabel: 'Number: '
            ,SophieNumber: '+995 591 22 95 59'

            ,Service: 'Service'
        }
    }
}

export default new Translator();