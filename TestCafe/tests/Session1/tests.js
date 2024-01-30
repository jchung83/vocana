import {Selector} from  "testcafe";

fixture('Getting Started')
    .page('https://appv2.vocana.co/');

    //Create a date string to help us validate the tests results with 'expect' method
    const dateToday = new Date();
    const day = String(dateToday.getDate()).padStart(2,'0');
    const month = String(dateToday.getMonth() + 1).padStart(2,'0');
    const year = dateToday.getFullYear();
    const fullDate = [day, month, year].join('/');



    //Test name as a constant
    const testName = "Profile new post no img"
    const datedTestText = testName + " " + fullDate;

    test( testName, async t => {
        
        //First, we resize the window to have the desired view of the website

        await

            t.resizeWindow(1600, 700);

        
        //Login

        const email = Selector("#Email");
        const password = Selector("#Password");
        const botonLogIn = Selector('.btn.btn-principal-pseudo-classes.btn-purple-57.btn-large.w-full');
        const profile = Selector('span').withText('Profile');
        const createPost = Selector('span').withText('Create Post');
        const textareaElement = Selector('textarea.mb-4.h-40.w-full.rounded.border-b.border-turquoise.bg-cobalt-22.pl-1.focus\\:border-turquoise');
    
        await t
            .typeText(email, 'jchung@sparxworks.com')
            .typeText(password, 'Aa.123456')
            .click(botonLogIn)

        //Actual test begins

            .click(profile)
            .click(createPost)  
            .typeText(textareaElement, datedTestText);

        const publishPost = Selector('button[type="submit"]');

        await t
            .click(publishPost);

        //Validate
        await t
            .expect(Selector('span').withText(datedTestText).exists).ok();

    });