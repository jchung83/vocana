import {Selector} from  "testcafe";

fixture ('Tests Vocana')
    .page ('https://appv2.vocana.co/')
    
    //Hook to reuse resize and login code for each test
    .beforeEach ( async t => {

        const email = Selector("#Email");
        const password = Selector("#Password");
        const botonLogIn = Selector('.btn.btn-principal-pseudo-classes.btn-purple-57.btn-large.w-full');
    
        await t
            .resizeWindow(1600, 720)
            .typeText(email, 'fan@fan.com')
            .typeText(password, 'Aa.123456')
            .click(botonLogIn);
    });

    //Create a date string to help us validate the tests results with 'expect' method
    const dateToday = new Date();
    const day = String(dateToday.getDate()).padStart(2,'0');
    const month = String(dateToday.getMonth() + 1).padStart(2,'0');
    const year = dateToday.getFullYear();
    const fullDate = [day, month, year].join('/');

    //Test template begins here

    test( "Playlist tests", async t => {
    
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            //Creating playlist
            .click('a[aria-label="Navigate to Music"]')
            .click('button[aria-label="Library"]')
            .click('button[aria-label="Create"]')
            .typeText('input[placeholder="Your Playlist Name"]', datedTestText)
            .setFilesToUpload('#input-file-create-playlist', ['./bart.png'])
            //Populating with songs
            .typeText('div.relative.rounded.text-white.mb-4 > #input-search[placeholder="Search..."]', "Smoke Emp")
            .pressKey('enter')
            .wait(2000)
            .expect(Selector('span').withText('Smoke Empire').exists).ok()
            .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.mb-6.mt-4.flex.max-h-\\[25vh\\].flex-col.overflow-y-auto.\\!overflow-x-hidden.lg\\:max-h-\\[35vh\\].overflow-y-auto > div > div:nth-child(2) > div.flex.items-center.gap-5 > button')
            //Verify icon changes to -
            .expect(Selector('svg[class="icon icon-remove-playlist undefined"]').exists).ok()
            //Clean search field
            .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.relative.rounded.text-white.mb-4 > button > svg')
            //Search for and add a 2nd song
            .typeText('div.relative.rounded.text-white.mb-4 > #input-search[placeholder="Search..."]', "mempir")
            .pressKey('enter')
            .wait(2000)
            .expect(Selector('span').withText('Mempireo').exists).ok()
            .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.mb-6.mt-4.flex.max-h-\\[25vh\\].flex-col.overflow-y-auto.\\!overflow-x-hidden.lg\\:max-h-\\[35vh\\].overflow-y-auto > div > div:nth-child(2) > div.flex.items-center.gap-5 > button')
            //Verify icon changes to -           
            .expect(Selector('svg[class="icon icon-remove-playlist undefined"]').exists).ok()
/*
! WAITING FOR A FIX TO BE IMPLEMENTED BY DEV, UNCOMMENT THIS BLOCK TO TEST WHEN IT'S FIXED
            //Remove from playlist
            .click(Selector('svg[class="icon icon-remove-playlist undefined"]'))
            //Verify - icon dissappears
            .expect(Selector('svg[class="icon icon-remove-playlist undefined"]').count).eql(0)
            //Re-add to playlist
            .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.mb-6.mt-4.flex.max-h-\\[25vh\\].flex-col.overflow-y-auto.\\!overflow-x-hidden.lg\\:max-h-\\[35vh\\].overflow-y-auto > div > div:nth-child(2) > div.flex.items-center.gap-5 > button')
*/
            //Save playlist
            .click('button[aria-label="Save"]')
            //Go inside playlist
            .click(Selector('span').withText(datedTestText))
            //Test playlist search
            .typeText('#input-search[placeholder="Search..."]', 'mempi')
            .click('button[aria-label="Search"]')
            .wait(3000)
            .expect(Selector('span').withText('Smoke Empire').count).eql(1)
            .expect(Selector('span').withText('Mempireo').count).eql(2)
            //Reset search
            .click('body > main > div.pageBaseWrapper > div > div > div > section > div > div.pt-7 > div > div.flex.w-full > div > button > svg')
            .wait(3000)
            .expect(Selector('span').withText('Smoke Empire').count).eql(2)
            .expect(Selector('span').withText('Mempireo').count).eql(2)
            //Edit playlist
            .click('.body > main > div.pageBaseWrapper > div > div > div > section > section > div.flex.px-4.py-7.justify-between > div.flex.flex-row > button:nth-child(1)')

    ;
    });
