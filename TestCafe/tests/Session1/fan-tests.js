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
            .wait(3000)
            .expect(Selector('span').withText('Smoke Empire').exists).ok()
            .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"]')
            //Verify icon changes to -
            .expect(Selector('svg[class="icon icon-remove-playlist undefined"]').exists).ok()
            //Clean search field
            .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.relative.rounded.text-white.mb-4 > button > svg')
            //Search for and add a 2nd song
            .typeText('div.relative.rounded.text-white.mb-4 > #input-search[placeholder="Search..."]', "mempir")
            .pressKey('enter')
            .wait(3000)
            .expect(Selector('span').withText('Mempireo').exists).ok()
            .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"]')
            //Verify icon changes to -           
            .expect(Selector('svg[class="icon icon-remove-playlist undefined"]').exists).ok()
/*
! WAITING FOR A FIX TO BE IMPLEMENTED BY DEV, UNCOMMENT THIS BLOCK TO TEST WHEN IT'S FIXED
            //Remove from playlist
            .click(Selector('svg[class="icon icon-remove-playlist undefined"]'))
            //Verify - icon dissappears
            .expect(Selector('svg[class="icon icon-remove-playlist undefined"]').count).eql(0)
            //Re-add to playlist
            .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"]')
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
            .click('body > main > div.pageBaseWrapper > div > div > div > section > section > div.flex.px-4.py-7.justify-between > div.flex.flex-row > button:nth-child(1)')
            //Remove an item
            .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"] > svg')
            .expect(Selector('span').withText('Mempireo').count).eql(0)
            .wait(3000)
            //Re add an item
            .typeText('div.relative.rounded.text-white.mb-4 > #input-search[placeholder="Search..."]', "mempir")
            .pressKey('enter')
            .wait(3000)
            .expect(Selector('span').withText('Mempireo').exists).ok()
            .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"]')
            .wait(3000)
            .expect(Selector('svg[class="icon icon-remove-playlist undefined"]').exists).ok()
            //Add more songs to test shuffle function
                //Reset search add (third song)
                .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.relative.rounded.text-white.mb-4 > button > svg')
                .wait(3000)
                .typeText('div.relative.rounded.text-white.mb-4 > #input-search[placeholder="Search..."]', "cosmic karma")
                .pressKey('enter')
                .wait(3000)
                .expect(Selector('span').withText('Cosmic Karma').exists).ok()
                .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"]')
                .wait(3000)
                
                //Reset search add (fourth song)
                .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.relative.rounded.text-white.mb-4 > button > svg')
                .wait(3000)
                .typeText('div.relative.rounded.text-white.mb-4 > #input-search[placeholder="Search..."]', "pink Tears in a joyful")
                .pressKey('enter')
                .wait(3000)
                .expect(Selector('span').withText('Pink Tears in a Joyful Sunshine').exists).ok()
                .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"]')
                .wait(3000)
                
                //Reset search add (fifth song)
                .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > div > div.body > div.relative.rounded.text-white.mb-4 > button > svg')
                .wait(3000)
                .typeText('div.relative.rounded.text-white.mb-4 > #input-search[placeholder="Search..."]', "acting on a hunch")
                .pressKey('enter')
                .wait(3000)
                .expect(Selector('span').withText('Acting On A Hunch').exists).ok()
                .click('div:nth-child(2) > div.flex.items-center.gap-5 > button[aria-label="Add/remove song"]')
                .wait(3000)
            //Close modal
            .click('div.customModal.modalWithoutImgProfile.\\!px-2.font-lato.sm\\:\\!px-6.lg\\:\\!px-10 > button[aria-label="Close"]')
            //Play playlist
            .click('div.flex.px-4.py-7.justify-between > div.flex.gap-4.self-end > button:nth-child(3)')
            .wait(1500)
            .expect(Selector('#rhap_current-time').withText('00:02').exists).ok()
            //Mute this please
            .click('button[aria-label="Mute"]')
            //Shuffle
            .click('div.flex.px-4.py-7.justify-between > div.flex.gap-4.self-end > button:nth-child(2)')
            //Open queue
            .click('body > main > div.pageBaseWrapper > div > div > div.audio.fixed.bottom-0.z-\\[2\\].flex.min-h-\\[80px\\].w-full.flex-row.justify-between.bg-cobalt-22.px-2 > div.container-player-icon-buttons.w-1\\/3.pr-3.text-white > div > div:nth-child(10) > button')
            .wait(2000)
            //Loads correct amount of elements?
// !waiting for a fix            .expect(Selector('section > div[class="flex w-full min-w-[250px] justify-between border-b-[1px] border-cobalt-33 px-2 py-3 "]').count).eql(4)
            //Is it actually shuffled??

            .wait(3000)
            ;
    });
