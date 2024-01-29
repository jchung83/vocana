
import {Selector} from  "testcafe";

fixture('Getting Started')
    //.page('https://appv2.vocana.co/');


test
.page('https://appv2.vocana.co/')

('My first test', async t => {
    await t.wait(3000);
    const email = Selector("#Email");
    const password = Selector("#Password");
    const botonLogIn = Selector('.btn.btn-principal-pseudo-classes.btn-purple-57.btn-large.w-full');
    const profile = Selector('span').withText('Profile');
    const createPost = Selector('span').withText('Create Post');
    const textareaElement = Selector('textarea.mb-4.h-40.w-full.rounded.border-b.border-turquoise.bg-cobalt-22.pl-1.focus\\:border-turquoise');

   



    await t.typeText(email, 'jchung@sparxworks.com');
    await t.typeText(password, 'Aa.123456');
    await t.click(botonLogIn)
    await t.wait(10000);

    await t.click(profile)

    await t.click(createPost)

    await t.typeText(textareaElement, 'test text');



    const fileInput = Selector('input[type="file"][style*="display: none;"]');

    // Set the path to the image you want to upload dynamically
    const imagePath = '/Users/javier/GIT/vocana/bart.png';

    // Simulate file upload by setting the files on the file input
    await t.setFilesToUpload(fileInput, [imagePath]);

    
    // Test code goes here
    console.log(" esta funcionando")
    await t.wait(30000);

});


test
.page('https://google.com')
('My first test', async t => {
    // Test code goes here
    console.log(" esta funcionando")
});