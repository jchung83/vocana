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
            .typeText(email, 'jchung@sparxworks.com')
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
            .click(selectImg)
            .wait(20000);

        const publishPost = Selector('button[aria-label="Post"]');

        await t
            .click(publishPost);

        //Validate
        await t
            .expect(Selector('span').withText(datedTestText).exists).ok();

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
            .click('button[aria-label="Add song to favorites"]')
            .expect(Selector('svg[class="icon icon-active-heart ml-2 fill-current transition duration-300 group-hover:text-purple-39"]').exists).ok()
            .click('button[aria-label="Add song to favorites"]')
            .expect(Selector('svg[class="icon icon-hover-heart ml-2 fill-current transition duration-300 group-hover:text-purple-39"]').exists).ok()

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

    test( "Profile palette", async t => {
        
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(profile)
            .click('button[aria-label="Edit Profile"]')
            .click('#1A2439#ffffff');


        //Validate
 //       await t
//            .expect(Selector('span').withText(datedTestText).exists).ok();

    });

