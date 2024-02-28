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
            .typeText(email, 'artist@artist.com')
            .typeText(password, 'Aa.123456')
            .click(botonLogIn);
    });

    //Create a date string to help us validate the tests results with 'expect' method
    const dateToday = new Date();
    const day = String(dateToday.getDate()).padStart(2,'0');
    const month = String(dateToday.getMonth() + 1).padStart(2,'0');
    const year = dateToday.getFullYear();
    const fullDate = [day, month, year].join('/');

    //Webpage common elements
    const profile = Selector('span').withText('Profile');
    const createPost = Selector('span').withText('Create Post');
    const textareaElement = Selector('textarea.mb-4.h-40.w-full.rounded.border-b.border-turquoise.bg-cobalt-22.pl-1.focus\\:border-turquoise');

    //Test template begins here

    test( "Profile new post no img", async t => {
    
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(profile)
            .click(createPost)  
            .typeText(textareaElement, datedTestText);

        const publishPost = Selector('button[aria-label="Post"]');

        await t
            .click(publishPost);

            console.log(datedTestText);
        //Validate
        await t
            .expect(Selector('span').withText(datedTestText).exists).ok();

    });

    //Ends here

    test( "Profile new post with img", async t => {
        
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(profile)
            .click(createPost)  
            .typeText(textareaElement, datedTestText);

        const selectImg = Selector('button[class="fill-white hover:fill-turquoise"]');

        await t
        .setFilesToUpload('body > main > div.pageBaseWrapper > div > div > div > div > main > section.profile__secondary-information > section.col-span-3.grid.gap-1\\.5.lg\\:gap-5 > section.dynamic-background-color.h-52.rounded-lg.p-3.lg\\:px-4.lg\\:py-5 > div > div.modalComponent.visible > div.customModal.modalWithImgProfile.undefined > div > div.body > div > input[type=file]', ['./bart.png'])
        .wait(3000)
        const publishPost = Selector('button[aria-label="Post"]');

        await t
            .click(publishPost);

        //Validate
        await t
            .expect(Selector('span').withText(datedTestText).exists).ok()
        ;
    });

    
    test( "Artist search", async t => {
    
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click('a[aria-label="Navigate to Search"]')
            .typeText('input[placeholder="Search..."]', "empire")
            .click('button[aria-label="Search"]');

            console.log(datedTestText);
        //Validate
        await t
            .wait(2000)
            .expect(Selector('span').withText("Hidden Empire").exists).ok();

        //Apply filter
        await t
        .click('div[class="dropdown-container rounded flex items-center h-12 w-full cursor-pointer bg-cobalt-33 px-4 text-white"]')
        .click(Selector('li[class="dropdown-option relative cursor-pointer bg-black px-4 py-2 font-normal text-white hover:bg-cobalt-33 focus:bg-cobalt-33"]').withText("Fan account"));

        //Validate
        await t
        .expect(Selector('span').withText("No results found for").exists).ok();
        

    });


    test( "Search for song, play it, test controls", async t => {
    
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click('a[aria-label="Navigate to Search"]')
            .typeText('input[placeholder="Search..."]', "smoke empire")
            .click('button[aria-label="Search"]')
            .click('img[alt="Smoke Empire"]')
            
        //Validate song footer controls exists
            .expect(Selector('span[class="w-32 truncate font-bold sm:w-56 lg:w-36"]').withText("Smoke Empire").exists).ok()

        //Play song for 1 second, then test control icons
            .click('img[alt="Smoke Empire"]')
            .expect(Selector('#rhap_current-time').withText("00:01").exists).ok()
            
            //Add to favorites
            .click('button[aria-label="Like song"]')
            .expect(Selector('svg[class="icon icon-active-heart ml-3 fill-current transition duration-300 hover:text-turquoise"]').exists).ok()
            .click('button[aria-label="Like song"]')
            .expect(Selector('svg[class="icon icon-hover-heart ml-3 fill-current transition duration-300 hover:text-turquoise"]').exists).ok()

            //Add artist
            .click('button[aria-label="Add Artist"]')
            .expect(Selector('svg[class="icon icon-add-artist-active ml-4 fill-current transition duration-300 group-hover:text-purple-39"]').exists).ok()
            .click('button[aria-label="Add Artist"]')
            .expect(Selector('svg[class="icon icon-add-artist ml-4 fill-current transition duration-300 group-hover:text-purple-39"]').exists).ok()

            //Shuffle


            //Previous
            //Next
            //PlayPause
            .click('button[aria-label="Pause"]')
            .click('button[aria-label="Play"]')

            //Loop
            .click('button[aria-label="Enable loop"]')
            .click('button[aria-label="Disable loop"]')

            //Mute unmute
            .click('button[aria-label="Mute"]')
            .click('button[aria-label="Unmute"]')
            .click('button[aria-label="Pause"]');

    });

    test( "Profile background", async t => {
        
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(profile)
            .click('#imgContent > button[aria-label="Edit Profile"]')
            .click('label[for="#d7dae8"]')
            .expect(Selector('html').getAttribute('style')).contains('background-color: #d7dae8')
            .click('label[for="#d2d173"]')
            .expect(Selector('html').getAttribute('style')).contains('background-color: #d2d173')
            .click('label[for="#d7dae8"]')
            .expect(Selector('html').getAttribute('style')).contains('background-color: #d7dae8')
            .click('label[for="#d2d173"]')
            .expect(Selector('html').getAttribute('style')).contains('background-color: #d2d173')
            ;
    });

    
    test( "Profile palette", async t => {
        
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(profile)
            .click('#imgContent > button[aria-label="Edit Profile"]')
            .click('label[for="#54533c#fbf2ef"]')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-box: #54533c')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-text: #fbf2ef')
            .click('label[for="#384042#e1fcff"]')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-box: #384042')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-text: #e1fcff')
            .click('label[for="#54533c#fbf2ef"]')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-box: #54533c')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-text: #fbf2ef')
            .click('label[for="#384042#e1fcff"]')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-box: #384042')
            .expect(Selector('html').getAttribute('style')).contains('colour-palette-text: #e1fcff')
            ;
    });

    test( "Create concert", async t => {
    
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t

        //Creating a concert draft
            .click('a[aria-label="Navigate to Concerts"]')
            .click('button[aria-label="create-concert"]')
            //Title
            .typeText('#title', datedTestText)
            //Imagen principal
            .setFilesToUpload('input[name="concert-image"]', ['./bart.png'])
            .wait(1000)
            //Banner
            .setFilesToUpload('input[name="concert-banner"]', ['./testbanner2.JPEG'])
            .wait(1000)
            //Date
            .click('#concert-date-input')
            .click('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(2) > div > div > span > div > div > div.react-calendar__navigation > button.react-calendar__navigation__arrow.react-calendar__navigation__next-button')
            .click('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(2) > div > div > span > div > div > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button:nth-child(19)')
            //Start time  
            .typeText('#start-time > div > div > input.react-time-picker__inputGroup__input.react-time-picker__inputGroup__hour', "10")
            .typeText('#start-time > div > div > input.react-time-picker__inputGroup__input.react-time-picker__inputGroup__minute', "30")
            .typeText('#start-time > div > div > select', "PM")
            //End time  
            .typeText('#end-time > div > div > input.react-time-picker__inputGroup__input.react-time-picker__inputGroup__hour', "11")
            .typeText('#end-time > div > div > input.react-time-picker__inputGroup__input.react-time-picker__inputGroup__minute', "30")
            .typeText('#end-time > div > div > select', "PM")
            //Precio  
            .typeText('#price', "110.55")
            //Ticket URL  
            .typeText('#ticketUrl', "https://google.com")
            //Venue name  
            .typeText('#venueName', "Test Venue")
            //Venue address
            .typeText('#venueAddress', "Test Address")
            //Country
            .click(Selector('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(9) > div > select'))
            .click(Selector('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(9) > div > select').find('option').withText('United States'))
            .expect(Selector('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(9) > div > select').value).eql('232')
            //State  
            .click(Selector('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(10) > div > select'))
            .click(Selector('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(10) > div > select').find('option').withText('Colorado'))
            .expect(Selector('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(10) > div > select').value).eql('7')
            //Venue link
            .typeText('body > main > div.pageBaseWrapper > div > div > div > div > div:nth-child(3) > div.grid.grid-cols-12 > div:nth-child(11) > div > div.input.flex.items-center.p-3 > input', "https://google.com")
            //Info
            .typeText('#text-area-concert-info', "Concert info test")
            //Save draft
            .click('button[aria-label="saveDraft"]')
            .wait(3000)
            //Now let's check that concert exists
            .click('a[aria-label="Navigate to Concerts"]')   
            .expect(Selector('body > main > div.pageBaseWrapper > div > div > div > div > section:nth-child(2) > button:nth-child(2) > div > span.flex > div.ml-5.text-left > p.font-body-extrabold').withText(datedTestText).exists).ok()
            //Draft exists no we go into draft and publish
            .click('body > main > div.pageBaseWrapper > div > div > div > div > section:nth-child(2) > button:nth-child(2) > div > span.flex > div.ml-5.text-left > p.font-body-extrabold')
            .click('body > main > div.pageBaseWrapper > div > div > div > div > div.flex.items-center.gap-4 > button:nth-child(6) > span')
            .wait(2000)
            //Check if it's published in the correct section
            .click('a[aria-label="Navigate to Concerts"]')
            .expect(Selector('body > main > div.pageBaseWrapper > div > div > div > div > section:nth-child(3) > button:nth-child(2) > div > span.flex > div.ml-5.text-left > p.font-body-extrabold').withText(datedTestText).exists).ok()
            //Let's unpublish
            .click(Selector('body > main > div.pageBaseWrapper > div > div > div > div > section:nth-child(3) > button:nth-child(2) > div > span.flex > div.ml-5.text-left > p.font-body-extrabold').withText(datedTestText))
            .click('body > main > div.pageBaseWrapper > div > div > div > div > section.relative.overflow-hidden.rounded > button.absolute.right-0.z-20.m-3.rounded-full.bg-cobalt-22.p-1')
            .click('body > main > div.pageBaseWrapper > div > div > div > div > div.flex.items-center.gap-4 > button:nth-child(6) > span')
            .click('body > main > div.pageBaseWrapper > div > div > div > div > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.flex.items-center.text-center > div > button > span')
            .wait(3000)
            //Check if it's unpublished
            .click('a[aria-label="Navigate to Concerts"]')   
            .expect(Selector('body > main > div.pageBaseWrapper > div > div > div > div > section:nth-child(2) > button:nth-child(2) > div > span.flex > div.ml-5.text-left > p.font-body-extrabold').withText(datedTestText).exists).ok()
            //Now let's delete it
            .click('body > main > div.pageBaseWrapper > div > div > div > div > section:nth-child(2) > button:nth-child(2) > div > span.flex > div.ml-5.text-left > p.font-body-extrabold')
            .click('body > main > div.pageBaseWrapper > div > div > div > div > div.flex.items-center.gap-4 > button:nth-child(5) > span')
            .click('body > main > div.pageBaseWrapper > div > div > div > div > div.modalComponent.visible > div.customModal.modalWithoutImgProfile.flex.items-center.text-center > div > button > span')  
            ;
    });