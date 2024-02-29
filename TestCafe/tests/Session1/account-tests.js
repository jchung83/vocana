import {Selector} from  "testcafe";

fixture ('Tests Vocana')
    .page ('https://appv2.vocana.co/')
    
    //Hook to reuse resize and login code for each test
    .beforeEach ( async t => {

        await t
            .resizeWindow(1600, 720)
            .click(Selector('button[aria-label="Sign Up"]'));

    });

    //Create a date string to help us validate the tests results with 'expect' method
    const dateToday = new Date();
    const day = String(dateToday.getDate()).padStart(2,'0');
    const month = String(dateToday.getMonth() + 1).padStart(2,'0');
    const year = dateToday.getFullYear();
    const fullDate = [day, month, year].join('-');



    test( "FanCreation", async t => {
    
        let datedTestText = t.testRun.test.name + fullDate;
        let email = datedTestText + "@" + datedTestText + ".com"
        //Actual test begins

        await t

        //Enter email and continue
        .typeText('#Email', email)
        .click(Selector('button[aria-label="Continue"]'))
        //Username
        .typeText(Selector('input[placeholder="User name"]'), datedTestText)
        //Date
        .click('#birthdayInput')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('div.react-calendar__month-view__days > button:nth-child(18)')
        //Password
        .typeText('#Password', 'Aa.123456')
        //Confirm Password
        .typeText(Selector('input[id="Password Confirm"]'), 'Aa.123456')
        //Go to next screen
        .click(Selector('button[aria-label="Continue"]'))
        //Fan or Artist
        .click('div.pageBaseWrapper > div > div > div > div > div > main > div.flex.gap-7 > button:nth-child(1)')
        .click(Selector('button[aria-label="Continue"]'))
        //Choose a plan
        .wait(2000)
        .click('div > div.flex.flex-row.justify-between.gap-5 > div:nth-child(1) > label > span > span:nth-child(1)')
        //Card details
        .switchToIframe('iframe[title="Cuadro de entrada seguro del número de tarjeta"]')
        .typeText('input[data-elements-stable-field-name="cardNumber"]', "4242424242424242")
        .wait(1000)
        .switchToMainWindow()
        .switchToIframe('iframe[title="Cuadro de entrada seguro del CVC"]')
        .typeText('input[name="cvc"]', "123")
        .wait(1000)
        .switchToMainWindow()
        .typeText('input[name="Card holder"]', "Nombre Apellido")
        .switchToIframe('iframe[title="Cuadro de entrada seguro de la fecha de vencimiento"]')
        .typeText('input[name="exp-date"]', "1228")
        .wait(1000)
        .switchToMainWindow()
        //City
        .typeText('input[name="City"]', "Denver")
        //Zipcode
        .typeText('input[name="Zip Code"]', "11011")
        //Country
        .click(Selector('#country'))
        .click(Selector('#country').find('option').withText('United States'))
        .expect(Selector('#country').value).eql('233')
        //State  
        .click(Selector('#state'))
        .click(Selector('#state').find('option').withText('Colorado'))
        .expect(Selector('#state').value).eql('1450')
        .typeText('input[name="Address"]', "Address " + fullDate)
        .click('label[for="setDefaultPayment"]')
        .click(Selector('span').withText("Continue"))
        .wait(5000)
        ;
    })

    test( "ArtistCreation", async t => {
    
        let datedTestText = t.testRun.test.name + fullDate;
        let email = datedTestText + "@" + datedTestText + ".com"
        //Actual test begins

        await t

        //Enter email and continue
        .typeText('#Email', email)
        .click(Selector('button[aria-label="Continue"]'))
        //Username
        .typeText(Selector('input[placeholder="User name"]'), datedTestText)
        //Date
        .click('#birthdayInput')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button')
        .click('div.react-calendar__month-view__days > button:nth-child(18)')
        //Password
        .typeText('#Password', 'Aa.123456')
        //Confirm Password
        .typeText(Selector('input[id="Password Confirm"]'), 'Aa.123456')
        //Go to next screen
        .click(Selector('button[aria-label="Continue"]'))
        //Fan or Artist
        .click('div.pageBaseWrapper > div > div > div > div > div > main > div.flex.gap-7 > button:nth-child(2)')
        .click(Selector('button[aria-label="Continue"]'))
        //Choose a plan
        .wait(2000)
        .click('div > div.flex.flex-row.justify-between.gap-5 > div:nth-child(1) > label > span > span:nth-child(1)')
        //Card details
        .switchToIframe('iframe[title="Cuadro de entrada seguro del número de tarjeta"]')
        .typeText('input[data-elements-stable-field-name="cardNumber"]', "4242424242424242")
        .wait(1000)
        .switchToMainWindow()
        .switchToIframe('iframe[title="Cuadro de entrada seguro del CVC"]')
        .typeText('input[name="cvc"]', "123")
        .wait(1000)
        .switchToMainWindow()
        .typeText('input[name="Card holder"]', "Nombre Apellido")
        .switchToIframe('iframe[title="Cuadro de entrada seguro de la fecha de vencimiento"]')
        .typeText('input[name="exp-date"]', "1228")
        .wait(1000)
        .switchToMainWindow()
        //City
        .typeText('input[name="City"]', "Denver")
        //Zipcode
        .typeText('input[name="Zip Code"]', "11011")
        //Country
        .click(Selector('#country'))
        .click(Selector('#country').find('option').withText('United States'))
        .expect(Selector('#country').value).eql('233')
        //State  
        .click(Selector('#state'))
        .click(Selector('#state').find('option').withText('Colorado'))
        .expect(Selector('#state').value).eql('1450')
        .typeText('input[name="Address"]', "Address " + fullDate)
        .click('label[for="setDefaultPayment"]')
        .click(Selector('span').withText("Continue"))
        .wait(5000)
        ;
    })