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
        .click(Selector('#tabpanel-2 > div > div:nth-child(1) > h3 > button'))

        .click(Selector('#tabpanel-2 > div > div:nth-child(2)'))
        .click(Selector('#tabpanel-2 > div > div:nth-child(2) > h3 > button'))

        .click(Selector('#tabpanel-2 > div > div:nth-child(3)'))
        .click(Selector('#tabpanel-2 > div > div:nth-child(3) > h3 > button'))

        .click(Selector('#tabpanel-2 > div > div:nth-child(4)'))
        .click(Selector('#tabpanel-2 > div > div:nth-child(4) > h3 > button'))

        //Terms & Conditions
            .click(Selector('#tabpanel-2 > div > div:nth-child(1)'))
            //History version 
            .click(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div:nth-child(2) > div > div.flex.flex-row.gap-4 > button.btn.btn-large.disabled\\:\\!bg-cobalt-33.disabled\\:text-white-67.btn-cobalt-33.hover\\:bg-purple-57'))
            .expect(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div:nth-child(2) > div > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.z-\\[100\\].max-h-\\[80\\%\\] > div > div.body > div').exists).ok()
            .click(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div:nth-child(2) > div > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.z-\\[100\\].max-h-\\[80\\%\\] > button > svg')) 
            //Edit text
            .click(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div:nth-child(3) > button.btn.btn-large.btn-cobalt-33.hover\\:bg-purple-57'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .typeText(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div  > div >  div > div.editor-class.rdw-editor-main > div > div > div > div > div > div > span > span'), datedTestText + 'Terms & Conditions')
            .click(Selector('#tabpanel-2 > div > div:nth-child(1) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div:nth-child(3) > button.btn.btn-large.btn-purple-57 > span'))  
        
        //Privacy Policy
            .click(Selector('#tabpanel-2 > div > div:nth-child(2)'))
            //History version 
            .click(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div:nth-child(2) > div > div.flex.flex-row.gap-4 > button.btn.btn-large.disabled\\:\\!bg-cobalt-33.disabled\\:text-white-67.btn-cobalt-33.hover\\:bg-purple-57'))
            .expect(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div:nth-child(2) > div > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.z-\\[100\\].max-h-\\[80\\%\\] > div > div.body > div').exists).ok()
            .click(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div:nth-child(2) > div > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.z-\\[100\\].max-h-\\[80\\%\\] > button > svg')) 
            //Edit text
            .click(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div:nth-child(3) > button.btn.btn-large.btn-cobalt-33.hover\\:bg-purple-57'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .typeText(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div  > div >  div > div.editor-class.rdw-editor-main > div > div > div > div > div > div > span > span'), datedTestText + 'Privacy Policy')
            .click(Selector('#tabpanel-2 > div > div:nth-child(2) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div:nth-child(3) > button.btn.btn-large.btn-purple-57 > span'))
        
        //FAQ
            .click(Selector('#tabpanel-2 > div > div:nth-child(3)'))
            //Edit text
            .click(Selector('#tabpanel-2 > div > div:nth-child(3) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(3) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div > button.btn.btn-large.btn-cobalt-33.hover\\:bg-purple-57'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(3) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .typeText(Selector('#tabpanel-2 > div > div:nth-child(3) > div  > div #contentAccordion > div  > div >  div > div.editor-class.rdw-editor-main > div > div > div > div > div > div > span > span'), datedTestText + 'FAQ')
            .click(Selector('#tabpanel-2 > div > div:nth-child(3) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div > button.btn.btn-large.btn-purple-57'))

        //About Vocana
            .click(Selector('#tabpanel-2 > div > div:nth-child(4)'))
            //Edit text
            .click(Selector('#tabpanel-2 > div > div:nth-child(4) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(4) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div > button.btn.btn-large.btn-cobalt-33.hover\\:bg-purple-57'))
            .click(Selector('#tabpanel-2 > div > div:nth-child(4) > div  > div #contentAccordion > div:nth-child(2) > div > button'))
            .typeText(Selector('#tabpanel-2 > div > div:nth-child(4) > div  > div #contentAccordion > div  > div >  div > div.editor-class.rdw-editor-main > div > div > div > div > div > div > span > span'), datedTestText + 'About Vocana')
            .click(Selector('#tabpanel-2 > div > div:nth-child(4) > div  > div #contentAccordion > div.bg-cobalt-16 > div.mx-5.flex.flex-row.items-center.justify-between.border-b.border-cobalt-33.pb-4.pt-5 > div > button.btn.btn-large.btn-purple-57'))

        ;
    });

    test( "User Manager", async t => {

        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(usermanager)

            //Validate list populates correctly
            .expect(Selector('td').withText("@hotmail.com").exists).ok()

            //Count TRs populating
            .expect(Selector('tr[class="cursor-pointer transition duration-75 odd:bg-cobalt-16 even:bg-cobalt-22 hover:bg-cobalt-33"]').count).eql(8)

            //Validate scrolling populates correctly
            .click(Selector('#tabpanel-0 > div > div.h-full.max-h-\\[44vh\\].overflow-auto.lg\\:max-h-\\[62vh\\] > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > span'))
            .wait(1000)
//            .pressKey('end')
//            .expect(Selector('tr[class="cursor-pointer transition duration-75 odd:bg-cobalt-16 even:bg-cobalt-22 hover:bg-cobalt-33"]').count).eql(16)

            //Test search box
            .typeText(Selector('#tabpanel-0 > div > div.flex.w-full.flex-row.items-center.justify-between.pb-5 > div.flex.gap-4 > div > input'), "anabel")
            .click(Selector('#tabpanel-0 > div > div.flex.w-full.flex-row.items-center.justify-between.pb-5 > div.flex.gap-4 > button'))
            
            //Validate other users disappear while search complies
            .expect(Selector('td').withText("valprit01@hotmail.com").count).eql(0)
            .expect(Selector('td').withText("anabel_once@gmail.com").exists).ok()
            //Click first name check if message fields prepopulate
            .click(Selector('#tabpanel-0 > div > div.h-full.max-h-\\[44vh\\].overflow-auto.lg\\:max-h-\\[62vh\\] > table > tbody > tr:nth-child(1)'))
            .click('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > button:nth-child(5) > span')
            .expect(Selector('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.undefined > div > div.body > form > div:nth-child(1) > div > div.relative > input[value="anabel once"]').exists).ok()
            .expect(Selector('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.undefined > div > div.body > form > div:nth-child(2) > div > div.relative > input[value="anabel_once@gmail.com"]').exists).ok()
            .typeText('#send-message', datedTestText)
            .click('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.undefined > button')
            //Switch to a different user and see if everything populates correctly
            .expect(Selector('td').withText('anabel_nueve@gamil.com').exists).ok()
            .click(Selector('#tabpanel-0 > div > div.h-full.max-h-\\[44vh\\].overflow-auto.lg\\:max-h-\\[62vh\\] > table > tbody > tr:nth-child(2)'))
            .click('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > button:nth-child(5) > span')
            .expect(Selector('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.undefined > div > div.body > form > div:nth-child(1) > div > div.relative > input[value="anabel nueve"]').exists).ok()
            .expect(Selector('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.undefined > div > div.body > form > div:nth-child(2) > div > div.relative > input[value="anabel_nueve@gamil.com"]').exists).ok()
            .typeText('#send-message', datedTestText)
            .click('body > main > div > div > div > div > div > div.mt-4.flex.size-full.gap-4 > div.relative.flex.h-full.min-h-\\[84vh\\].w-\\[25\\%\\].flex-col.items-center.rounded.bg-cobalt-22.p-3 > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.undefined > div > div.body > form > button')
    ;
    });