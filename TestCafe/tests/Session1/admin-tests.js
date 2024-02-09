import {Selector} from  "testcafe";

fixture ('Tests Vocana')
    .page ('https://adminv2.vocana.co/')
    
    //Hook to reuse resize and login code for each test
    .beforeEach ( async t => {

        const email = Selector("#email");
        const password = Selector("#password");
    
        await t
            .resizeWindow(1600, 720)
            .typeText(email, 'admin@sparxworks.com')
            .typeText(password, 'Admin#2024')
            .click(Selector('label[for="rememberMe"]'))
            .expect(Selector('#rememberMe[aria-checked="true"]').exists).ok()
            .click(Selector('label[for="rememberMe"]'))
            .expect(Selector('#rememberMe[aria-checked="false"]').exists).ok()
            .click(Selector('button[aria-label="Log In"]'))
    });

    //Create a date string to help us validate the tests results with 'expect' method
    const dateToday = new Date();
    const day = String(dateToday.getDate()).padStart(2,'0');
    const month = String(dateToday.getMonth() + 1).padStart(2,'0');
    const year = dateToday.getFullYear();
    const fullDate = [day, month, year].join('/');

    //Webpage menu elements
    const profile = Selector('span').withText('Profile');
    const home = Selector('span').withText('Home');
    const internalmanager = Selector('span').withText('Internal Manager');
    const usermanager = Selector('span').withText('User Manager');
    const supportmanager = Selector('span').withText('Support Manager');
    const reconciliation = Selector('span').withText('Reconciliation');

    //*INTERNAL MANAGER OPERATIONS TESTS

    //Access manager tests

        test( "Access manager tests", async t => {
    
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(internalmanager)
            .click('#tabpanel-0 > div > section:nth-child(1) > button:nth-child(4)')
        //Validate list loads
        await t
            .expect(Selector('span').withText("admin@sparxworks.com").exists).ok();

        //Search for user
        await t
            .typeText(Selector('#tabpanel-0 > div > section > div > input'), 'ana')
            .click('button[aria-label="Search"]');
        
        //Validate other users disappear while search complies
        await t
            .expect(Selector('span').withText("admin@sparxworks.com").count).eql(0)
            .expect(Selector('span').withText("Ana Pantano").exists).ok();

        //Test close button in search bar works
        await t
        .click('svg[class="icon icon-close absolute right-3 top-3"]')
        .expect(Selector('span').withText("admin@sparxworks.com").exists).ok();



    });


    //Vocana documents tests

        test( "Vocana Documents", async t => {
    
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(internalmanager)
            .click(Selector('span').withText("Vocana Documents"))
        
        //Test acoordions
        .click(Selector('#tabpanel-2 > div > div:nth-child(1)'))
        .click(Selector('#tabpanel-2 > div > div.szh-accordion__item.szh-accordion__item--status-entered.szh-accordion__item--expanded.group'))

        .click(Selector('#tabpanel-2 > div > div:nth-child(2)'))
        .click(Selector('#tabpanel-2 > div > div.szh-accordion__item.szh-accordion__item--status-entered.szh-accordion__item--expanded.group'))

        .click(Selector('#tabpanel-2 > div > div:nth-child(3)'))
        .click(Selector('#tabpanel-2 > div > div.szh-accordion__item.szh-accordion__item--status-entered.szh-accordion__item--expanded.group'))

        .click(Selector('#tabpanel-2 > div > div:nth-child(4)'))
        .click(Selector('#tabpanel-2 > div > div.szh-accordion__item.szh-accordion__item--status-entered.szh-accordion__item--expanded.group'))
        ;
    });

