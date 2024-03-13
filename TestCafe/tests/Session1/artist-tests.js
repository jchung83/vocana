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
    const hour = dateToday.getHours();
    const minutes = dateToday.getMinutes();
    const time = [hour, minutes].join('');
    const DMY = [day, month, year].join('/');
    const fullDate = [DMY, time].join('-');

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
        .wait(1500)
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
        .click(Selector('li[class="dropdown-option relative cursor-pointer bg-black px-4 py-2 font-normal text-white hover:bg-cobalt-33 focus:bg-cobalt-33"]').withText("Profile"));

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
            .setFilesToUpload('div:nth-child(1) > div > input[accept="image/*"]', ['./bart.png'])
            .wait(1000)
            //Banner
            .setFilesToUpload('div:nth-child(1) > div > input[accept="image/*"]', ['./testbanner2.JPEG'])
            .wait(1000)
            //Date
            .click('#concert-date-input')
            .click('.react-calendar__navigation__arrow.react-calendar__navigation__next-button')
            .click('.react-calendar__month-view__days > button:nth-child(23)')
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
            .typeText('#ticketUrl', "google.com")
            //Venue name  
            .typeText('#venueName', "Test Venue")
            //Venue address
            .typeText('#venueAddress', "Test Address")
            //Country
            .click(Selector('select[id="countries"]'))
            .click(Selector('select[id="countries"]').find('option').withText('United States'))
            .expect(Selector('select[id="countries"]').value).eql('232')
            //State  
            .click(Selector('select[id="states"]'))
            .click(Selector('select[id="states"]').find('option').withText('Colorado'))
            .expect(Selector('select[id="states"]').value).eql('7')
            //City
            .typeText('input[placeholder="city"]', "Denver")
            //Zipcode
            .typeText('input[placeholder="zipCode"]', "80014")
            //Venue link
            .typeText('input[placeholder="link"]', "https://google.com")
            //Info
            .typeText('#text-area-concert-info', "Concert info test")
            //Save draft
            .click('button[aria-label="saveDraft"]')
            .wait(6000)
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

    test( "News Create Draft", async t => {
        
        let datedTestText = t.testRun.test.name + " " + fullDate;
        let template = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam elit sit amet quam posuere, eget sollicitudin libero rutrum. Duis tristique dignissim tellus, at mattis lectus tempus et. Suspendisse posuere, risus non vulputate facilisis, nulla dui tincidunt nibh, et hendrerit risus ligula ut diam. Suspendisse ut eros tellus. Cras facilisis ligula id nisi mollis tincidunt. Aenean ut faucibus velit. Aliquam sit amet dui quis lectus ullamcorper consequat. Vestibulum at orci quam. Quisque et libero quis mauris venenatis sollicitudin. Proin placerat mauris felis, ut tempor ipsum dictum nec. Aliquam suscipit dolor et sapien mattis, venenatis rhoncus dolor ultricies. Mauris id erat fermentum, laoreet eros eu, posuere orci. Etiam aliquet rutrum turpis ut sollicitudin. Maecenas vel ligula vel mi venenatis imperdiet.

        In hac habitasse platea dictumst. Nulla tincidunt vulputate auctor. Donec vel tincidunt augue, a pellentesque magna. Cras eu tortor eu dolor bibendum vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc facilisis sollicitudin nibh quis elementum. Aliquam erat volutpat. Curabitur condimentum, purus et venenatis malesuada, arcu dolor auctor purus, vitae consectetur erat lorem quis lorem. Suspendisse at pulvinar risus, nec volutpat dolor. Mauris metus arcu, imperdiet sed placerat eget, varius in purus.
        
        Proin quam purus, bibendum sed sodales vel, vestibulum vel nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi dictum, lacus at iaculis egestas, neque nibh ultricies turpis, ac malesuada orci magna sed massa. Donec fringilla dictum eros ac sagittis. Nam nibh orci, auctor eget nibh sit amet, commodo aliquam urna. Praesent lorem lacus, egestas et ullamcorper in, elementum quis dui. Praesent et risus egestas, molestie nulla nec, scelerisque nisl. Curabitur scelerisque diam diam, non tincidunt leo posuere at.
        
        Quisque mauris mauris, placerat vulputate lectus vel, efficitur mattis ante. Suspendisse blandit ligula sed risus dapibus fermentum. Donec eget urna faucibus purus lobortis dignissim. In elementum lacus ut purus tempus, in ornare leo aliquet. Curabitur non congue orci. Cras et nulla id sem convallis vestibulum ac eget lacus. Sed cursus ex et mi faucibus tincidunt. In sit amet arcu non quam congue volutpat nec eu ligula. Sed euismod molestie enim sit amet porttitor. Suspendisse posuere nunc ac erat imperdiet, nec sagittis augue egestas. Nunc sodales libero non elementum sodales. Cras felis enim, hendrerit vel tincidunt quis, dapibus sit amet risus. Nunc pretium, nulla id condimentum elementum, orci nisl gravida turpis, ac finibus eros libero vel neque. Ut eget velit et magna imperdiet fringilla. Sed dictum, arcu a varius interdum, nunc quam dignissim ipsum, consequat rutrum lacus libero ac massa.
        
        Maecenas et luctus purus. Morbi dapibus arcu non ex fringilla, quis facilisis turpis tristique. Integer orci metus, molestie a volutpat non, faucibus nec ligula. Suspendisse ex lectus, posuere vitae tincidunt ut, dignissim in nulla. Ut dictum maximus purus non laoreet. Donec rutrum dolor lectus, in viverra dui suscipit quis. Integer in ex pulvinar, luctus sapien in, faucibus ligula. Nullam faucibus nibh vel lacus hendrerit, non ultrices odio scelerisque. Etiam accumsan urna nec accumsan dapibus. In ut scelerisque eros.
        
        Nulla laoreet dui at leo malesuada, ac dignissim est ultrices. Suspendisse potenti. Nullam faucibus congue purus, ut iaculis lacus bibendum sed. Nullam pellentesque ante bibendum efficitur imperdiet. Nulla eu feugiat augue, vel ultrices ligula. Etiam suscipit ipsum in ipsum blandit, fringilla malesuada turpis hendrerit. Vestibulum neque lacus, condimentum faucibus arcu at, fermentum pretium eros. Vivamus efficitur suscipit molestie. Curabitur venenatis porttitor ex non sagittis. Phasellus tincidunt neque non est dapibus sollicitudin. Pellentesque consectetur vel enim quis aliquet. Praesent ut elementum enim, non finibus risus. Ut augue turpis, hendrerit et eleifend eu, rhoncus a magna. Aenean et sem euismod, accumsan mi at, mollis nunc. Sed mauris turpis, scelerisque cursus metus quis, convallis volutpat eros. Vestibulum porta mollis sollicitudin.
        
        Sed eu tempor ante, ut tristique mi. Nam placerat feugiat leo, vitae congue enim. Sed mi orci, malesuada non turpis ut, fermentum fringilla urna. Sed id vehicula eros, et efficitur quam. Nunc lobortis convallis pellentesque. Vestibulum sagittis tortor orci, at pretium massa vestibulum eget. Praesent sed nulla sagittis, tempus nulla eu, aliquet est. Sed malesuada lacus sagittis turpis semper auctor vel et sem. Nam vel ligula sit amet magna pulvinar rutrum. Pellentesque vehicula augue risus, ac sagittis odio cursus vitae. Sed eget dolor vulputate, fringilla neque sit amet, iaculis ante. Nulla facilisi. Cras placerat porttitor ante mollis mollis. Mauris auctor orci magna, vitae porttitor turpis aliquet in. Praesent facilisis malesuada risus, ut placerat urna dapibus varius. Quisque tellus nisl, aliquam quis nulla et, tincidunt ornare augue.
        
        Praesent vel velit dui. Suspendisse in ultricies neque. Sed pharetra odio ut sem eleifend, at imperdiet dui molestie. Nulla vel blandit tortor. Nulla a arcu non ante placerat efficitur. Fusce laoreet maximus dignissim. Vestibulum commodo placerat rhoncus.
        
        Quisque sollicitudin sagittis euismod. Proin a nibh nunc. Maecenas in quam non nisl volutpat mattis. Etiam porttitor, nulla vitae vestibulum sagittis, ligula nulla ultricies velit, sed dignissim nulla tellus vitae magna. Nulla vitae est in erat hendrerit dignissim quis vitae mi. Proin elementum lacinia libero ac elementum. Proin in orci eget nisi pulvinar accumsan. Proin tristique in augue a commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vitae elementum sapien. Nullam ac purus lobortis, cursus urna in, dapibus mi.
        
        Nam pharetra dolor dui, quis convallis libero elementum vel. Nulla id dictum est. In euismod semper vehicula. Phasellus iaculis quam et ornare viverra. Etiam enim enim, sollicitudin in tortor sit amet, rhoncus congue est. Proin sodales odio vitae massa mattis mattis. Nullam rutrum placerat est id aliquam. Vestibulum elementum urna leo, tristique fermentum ante fermentum convallis.
        
        Nunc a ultrices mauris. Quisque accumsan tincidunt consectetur. Aliquam ut velit sed sapien semper pretium interdum vitae enim. Integer eget laoreet eros. Phasellus euismod libero sapien, quis aliquet erat aliquet id. Duis mattis nunc vitae auctor maximus. Aliquam feugiat aliquam mauris ac bibendum. Quisque justo felis, porta id lorem auctor, consequat fermentum justo. Phasellus ultricies tincidunt arcu, at vestibulum ante blandit quis. Nam vitae mattis libero. Cras in dapibus mauris.
        
        Donec lobortis sem ac enim congue sodales. Nullam non ultrices nisl. Nam ultrices magna in pulvinar efficitur. In eu purus varius, commodo ligula a, ultrices augue. Proin sed augue ac orci rutrum finibus imperdiet sit amet felis. Suspendisse efficitur iaculis erat ac ornare. Donec feugiat felis sed molestie feugiat. Fusce volutpat nec tellus non maximus. Vivamus molestie nunc mauris, quis semper enim pharetra ac. Suspendisse eros dolor, molestie vitae massa et, gravida lobortis orci. In consequat enim eget magna maximus, vitae vehicula metus lobortis. Donec erat enim, porta ut accumsan ac, sodales eu massa. Fusce eget tellus turpis.
        
        Phasellus sit amet leo eget sapien pharetra tempus vitae in nisi. Ut arcu elit, consequat ac cursus in, vulputate nec mi. Praesent gravida lacus quis neque lobortis eleifend. Duis id ante turpis. Phasellus consectetur mi eu dolor vulputate ornare non eu odio. In nisl quam, pharetra ut lorem non, facilisis mattis eros. Suspendisse eget pulvinar sapien. Mauris porttitor pharetra tellus, in rutrum urna varius sed.
        
        Etiam dictum nulla eget ante viverra, non suscipit dolor tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In aliquet pulvinar lectus, id suscipit urna. Donec lacus turpis, feugiat et suscipit nec, facilisis quis risus. Aenean sit amet tellus sem. Donec sed euismod mauris. Phasellus mollis, mi eget molestie molestie, tortor ipsum tempus nunc, a ullamcorper velit magna in dui.
        
        Vivamus tempus justo in nulla porttitor malesuada. Donec rutrum, elit in fringilla condimentum, turpis ligula aliquet enim, ut mollis lacus ligula id tellus. Mauris egestas ligula urna, sit amet maximus libero mattis in. Maecenas dapibus, turpis in sollicitudin pretium, sem magna dapibus odio, id scelerisque lacus risus nec augue. Donec ultricies nulla sit amet ultrices aliquam. Aenean vitae ornare magna, ac lobortis nisl. Cras malesuada tortor a molestie eleifend. Etiam vestibulum suscipit tellus et bibendum. Proin condimentum, magna quis efficitur gravida, ex leo accumsan mauris, sit amet rhoncus tellus nibh sit amet est.
        
        Pellentesque malesuada mattis dictum. In hac habitasse platea dictumst. Sed et feugiat ante. Sed dignissim leo non nisl consequat ullamcorper. Sed at interdum ex. Vestibulum pharetra dolor et arcu sodales, quis commodo nibh venenatis. Sed in dui ut dolor tempor dapibus sit amet et risus. Nulla facilisi.
        
        In ac magna velit. Phasellus at maximus dolor. Mauris molestie magna neque, sit amet ullamcorper magna pretium sit amet. Fusce ullamcorper imperdiet metus, at mollis arcu tincidunt et. Quisque tempor consequat purus sagittis posuere. Aenean et pharetra ex, ac vestibulum mauris. Morbi ornare eleifend viverra. Nam quis rhoncus erat. Aenean dictum risus tortor, a eleifend lectus ornare non. Donec non tellus bibendum, imperdiet diam vitae, scelerisque augue. Suspendisse pulvinar nisl eget dolor vulputate finibus. Praesent elementum vestibulum scelerisque. Aliquam euismod volutpat diam quis molestie. Nulla vehicula neque dolor, at finibus urna laoreet non.
        
        Etiam scelerisque tincidunt leo vel feugiat. Fusce sodales turpis quis dapibus hendrerit. Sed lectus dolor, lacinia vitae tempor et, dapibus et nisi. In eget sapien vitae eros suscipit pellentesque vehicula a velit. Duis quis auctor sapien. Mauris vel urna a nibh tempus luctus sed placerat mauris. Curabitur id arcu nibh. Integer condimentum malesuada eros in porttitor. Nunc ut ante nec urna venenatis sagittis. Sed imperdiet, ipsum id volutpat commodo, tortor metus rhoncus neque, sed tempus elit sapien sed nisl. Integer laoreet urna a elit laoreet facilisis. Morbi id ullamcorper nulla. Aliquam fringilla urna urna, at cursus elit vehicula sed. Proin egestas, lorem sit amet facilisis dapibus, quam libero eleifend eros, malesuada varius lorem tellus ut metus. Suspendisse ullamcorper mauris nec sapien fringilla, et dictum metus fermentum. Integer ac iaculis enim, id viverra nisl.
        
        Suspendisse tempus porta odio, in consectetur mi bibendum ut. Curabitur luctus iaculis euismod. Sed ornare blandit ex, ac imperdiet quam molestie sed. Quisque sed sapien mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur finibus vehicula nibh at vestibulum. Sed tincidunt elementum eros. Ut bibendum erat eget arcu scelerisque, nec viverra nisl cursus. Etiam quis ornare lacus. Proin blandit in justo eget lacinia.
        
        In eu nisl leo. Fusce ligula erat, tempor eget elementum eget, sollicitudin nec sapien. Cras maximus, mi faucibus tristique lobortis, felis arcu egestas erat, eget dignissim metus est sagittis magna. Suspendisse dictum felis massa, ac vulputate orci sollicitudin porta. Sed at ornare risus, nec volutpat sem. Donec nulla tortor, eleifend at ultrices id, tempor a risus. Proin ornare felis lorem, vel semper urna tincidunt quis. Vestibulum finibus commodo est, ac ultrices quam dignissim dictum. Donec a urna vel risus iaculis lacinia quis eget nisi. Duis tristique, enim nec eleifend faucibus, nisl arcu dictum nibh, nec consequat mi felis ut metus. Nulla in efficitur nibh. Cras pharetra malesuada odio, eget consequat nibh semper et. Suspendisse maximus, massa sed porttitor ultricies, nisl sapien commodo nibh, ac ornare nulla eros eget magna.
        
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at erat in elit tincidunt ultrices. Vestibulum eget commodo urna. Nam porta magna id tortor iaculis facilisis. Cras tempor condimentum ex. Nullam in mi ac purus cursus aliquam in id est. Integer lacinia mattis metus vel vehicula. Cras cursus risus ligula, eu iaculis diam varius a. Sed venenatis cursus suscipit. Quisque in risus elementum, tristique ligula at, gravida turpis. Duis scelerisque tellus risus, nec ullamcorper enim mollis eget. Vivamus vitae ex a nisl congue lobortis.
        
        Quisque mauris risus, elementum quis fringilla vel, eleifend laoreet elit. Aenean non orci nec metus egestas rutrum in vel turpis. Morbi dapibus aliquam mauris eu accumsan. Maecenas venenatis commodo eros, quis laoreet velit. Maecenas bibendum aliquet dignissim. Vivamus quis pellentesque augue. Nullam rutrum, risus quis congue finibus, libero tellus vestibulum ante, sit amet ultricies felis neque vitae neque. Aliquam nec velit porttitor, egestas tellus eget, ultricies ipsum. Nunc ultrices tincidunt cursus. Praesent vel arcu porta, auctor lacus sit amet, varius turpis. Nam dignissim non elit eu eleifend. Sed ut nulla ac sapien bibendum volutpat vitae quis nulla. Phasellus sit amet dui et nisl venenatis tempus ac ut nisl.
        
        Pellentesque purus nunc, venenatis a mattis non, dapibus sit amet est. Nam vestibulum varius aliquam. Donec efficitur odio nec commodo fermentum. Praesent malesuada consequat neque eu tempor. Donec ullamcorper suscipit tellus, sit amet consequat lorem dapibus eu. Duis et convallis ante. Sed interdum erat at dolor auctor, vitae tempor justo commodo.
        
        Sed ultricies odio ac velit fermentum posuere. Integer a pellentesque dui. Phasellus non est interdum, tempor lorem eget, aliquet quam. Donec venenatis nec nisl nec vehicula. Morbi in dui vel tortor tempus vehicula ut et felis. Quisque lacinia ac nisi dictum ornare. Morbi et egestas leo. Aenean pretium faucibus mauris, ut pretium tortor dignissim sed. Cras quis posuere orci. Sed aliquet nulla felis, eu feugiat turpis sollicitudin vel. Nullam eu vestibulum ligula, nec mattis lectus. Nunc volutpat lorem sit amet diam dignissim auctor. Ut ligula urna, elementum vitae varius ac, dictum nec dolor. Suspendisse vehicula nulla nisl. Quisque velit metus, consectetur quis suscipit sit amet, malesuada et augue.
        
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus tincidunt cursus accumsan. In blandit erat et erat posuere, vitae tincidunt augue volutpat. Ut eu auctor libero, sed rutrum lorem. Etiam non ullamcorper justo, vitae rhoncus eros. Curabitur neque est, volutpat vitae mollis eu, vestibulum id ante. Pellentesque scelerisque malesuada dapibus. Donec rutrum dui ut molestie tincidunt.
        
        Donec eget eros augue. Aliquam nec ornare ligula. Praesent molestie enim eget tempor hendrerit. Curabitur consequat ac erat et consequat. Nullam auctor metus lectus, a convallis sapien vulputate sed. Fusce convallis semper odio congue vehicula. Nam in posuere turpis, ut placerat orci. Curabitur molestie pellentesque dui, lacinia molestie risus bibendum rhoncus. Vestibulum at rutrum orci.
        
        Suspendisse aliquet augue sed sollicitudin vulputate. Nulla consectetur, leo eget convallis egestas, purus ante condimentum risus, in efficitur metus augue sit amet est. Curabitur sit amet dapibus odio. Suspendisse commodo turpis sem, non eleifend quam facilisis eget. In euismod risus orci, eu tincidunt nisl cursus eget. Quisque ligula nisi, congue non volutpat et, blandit at dolor. Donec eget consectetur nunc. Suspendisse eget nisl volutpat, iaculis tortor tempor, sagittis dolor. Proin tincidunt, odio dignissim congue iaculis, nisl sem venenatis metus, tristique fermentum urna tortor quis urna.
        
        Suspendisse congue at augue sed tempor. Nullam sagittis vestibulum tellus sit amet consectetur. Sed tempor turpis non finibus volutpat. Vestibulum nec tellus tempor, cursus ipsum dignissim, vehicula nibh. Aenean eleifend urna a tempor convallis. Cras eu sollicitudin metus. Nullam sed interdum dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in mi nec libero ornare finibus ut sit amet orci. Sed ornare purus et mi dictum convallis. Nunc ut orci nec purus fringilla tincidunt. Vestibulum euismod augue a sapien dapibus, quis ullamcorper metus accumsan. Cras condimentum maximus eros quis mattis. Vestibulum tempor mi eu fringilla vestibulum. Donec sagittis nibh at tristique vulputate. Maecenas ac velit luctus, ornare nunc eu, volutpat nulla.
        
        Cras nec est libero. Nullam pretium mi erat, vitae pharetra turpis blandit nec. Donec posuere vestibulum varius. Maecenas rhoncus ac dui ut tempus. Fusce bibendum elementum erat, in rhoncus enim porttitor ac. Sed sodales quam eget viverra ultrices. Mauris tempus, eros id tristique molestie, augue nisl tempus quam, nec ornare ante metus sed diam.
        
        Etiam finibus dolor at est tristique, non mollis dolor porta. Maecenas a lobortis velit. Integer dapibus eu leo in mattis. Nulla ac erat nec ipsum dapibus condimentum. Proin interdum nisl sit amet urna sodales, congue molestie sapien cursus. Pellentesque laoreet cursus nulla eu gravida. Donec sapien arcu, efficitur eget hendrerit non, ullamcorper eget mauris. Proin in nisl eros.
        
        Donec hendrerit arcu ac cursus fermentum. Suspendisse suscipit est a quam eleifend, in rhoncus nulla ultricies. Nullam in justo quis arcu congue ultricies eu et lacus. Duis eget est faucibus, gravida dui quis, semper libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam eget lobortis quam. Vestibulum lobortis ullamcorper elementum. Mauris imperdiet mi eu leo scelerisque, nec viverra augue fermentum. Maecenas facilisis leo ultricies ex mollis tempor. Sed ac porta nisl, hendrerit consequat purus. In iaculis sem eu lectus consequat dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dolor diam, laoreet a elementum at, gravida in ligula. Aenean et bibendum mi.
        
        Sed a sem convallis, maximus tellus quis, accumsan dui. Nullam vitae pellentesque risus. Phasellus id nisl vel lacus aliquet semper. Suspendisse ut mi at ex varius rutrum. Donec at rhoncus diam. Praesent mattis, ligula nec aliquet condimentum, libero diam tincidunt eros, eu suscipit enim massa a leo. Phasellus non lobortis massa. Fusce tincidunt finibus posuere. Maecenas a velit nulla. Morbi euismod arcu eget finibus gravida. Suspendisse hendrerit non mauris vel sagittis. Nullam et efficitur nulla. Maecenas euismod dui ac sapien rutrum pellentesque. Integer ut volutpat lacus. Nunc ut blandit sapien.
        
        Sed molestie justo at tortor euismod, ut facilisis nibh ultricies. Aenean a purus magna. Donec laoreet, nulla a tempor mattis, ante sem gravida nisi, in semper velit eros in lectus. Morbi rhoncus pulvinar pretium. Maecenas a turpis a dolor tempor pharetra id in urna. Ut volutpat lorem tortor, eget tincidunt orci interdum eget. Nullam vel neque euismod, eleifend dolor et, eleifend magna. Aliquam quis consectetur neque. Donec hendrerit consectetur lacus nec ullamcorper. Vestibulum non dui sed lorem imperdiet malesuada. Curabitur sit amet erat in turpis pellentesque malesuada. Maecenas varius ultrices urna, a fringilla turpis gravida vitae. Etiam id nunc lobortis, tempus libero ac, facilisis felis.
        
        Curabitur tincidunt pharetra est in imperdiet. Curabitur laoreet massa erat, a pharetra nisl pellentesque eget. Nullam in dictum libero. Duis dolor leo, maximus sit amet bibendum sit amet, iaculis sit amet ligula. Donec gravida sit amet augue at cursus. In hac habitasse platea dictumst. Vestibulum condimentum erat sed libero efficitur faucibus.
        
        Nulla faucibus mi quis urna viverra, ut consectetur ante placerat. Aliquam luctus tempus commodo. Aenean semper feugiat lacus. Curabitur a enim non lectus dapibus facilisis faucibus non ex. Suspendisse eget molestie lorem. Fusce sit amet varius augue, in laoreet dui. Donec sollicitudin, nisl ac tempus porta, nulla arcu lacinia nibh, imperdiet consequat eros leo at lacus. Curabitur vitae nunc velit. Quisque tincidunt odio diam, in ultricies odio posuere a. Suspendisse imperdiet mauris at dapibus tristique. Ut mattis nulla tincidunt magna eleifend tempor. Phasellus sed varius dolor, et pretium nulla. Suspendisse potenti.
        
        Nulla est felis, vulputate a justo sed, molestie elementum libero. Etiam ut lacus mauris. Nulla blandit magna elit, id accumsan mi interdum at. Donec id eros maximus, dictum eros viverra, porta elit. Proin consectetur blandit eros vel interdum. Maecenas id molestie lorem, ac maximus augue. Mauris maximus orci eu magna facilisis tincidunt. Curabitur sit amet consequat eros. Donec nec laoreet sem, vitae cursus arcu. Curabitur lobortis, turpis a pellentesque feugiat, erat libero fringilla turpis, id malesuada orci libero nec libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eros est, laoreet at elit tristique, auctor malesuada dui. Vestibulum accumsan justo lacus, id rhoncus elit fermentum nec. Suspendisse sapien neque, vulputate at luctus a, mollis sit amet dolor.
        
        Ut in tortor vel elit faucibus semper ac ac augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur laoreet quam id pharetra. Nam pretium et leo a sollicitudin. Praesent dignissim turpis ligula, ut malesuada tortor interdum et. Fusce sollicitudin quam non tellus congue aliquet. Curabitur cursus arcu lorem, pretium accumsan est pharetra non. In tellus nisi, porta non massa consequat, iaculis hendrerit leo. Maecenas dignissim nulla et arcu tristique cursus. Pellentesque placerat massa nibh, et malesuada justo tincidunt nec. Ut a hendrerit sapien. Aenean risus erat, aliquam quis ex ac, facilisis facilisis mauris.
        
        Suspendisse semper lobortis erat et gravida. Donec iaculis lectus nec nisi semper fringilla. Pellentesque condimentum mollis ipsum, eget tristique erat dignissim vel. Aenean sollicitudin tincidunt elit, a tempus ante. Nulla et nisi ut dui accumsan pellentesque. Maecenas id hendrerit turpis. Nunc posuere ligula in nibh viverra, sit amet ultricies metus volutpat. Vivamus pretium feugiat ornare. Proin vehicula tortor ac ligula condimentum, consequat varius ex porttitor. In at nunc eget magna feugiat hendrerit vitae ac ante. Nullam sed ipsum iaculis, ultrices dolor quis, dignissim lorem.
        
        Sed rutrum mi sed lectus pretium, vitae pretium est tempus. Mauris non turpis congue, placerat metus ac, tempor odio. Morbi arcu eros, pulvinar at nisi quis, pulvinar rutrum nibh. Aliquam ex tortor, vulputate eget purus eu, sollicitudin fermentum justo. In vel facilisis ligula. Aenean ut ultrices mauris, elementum euismod sem. Donec tortor dolor, posuere at euismod dictum, pulvinar eu diam. Suspendisse felis nibh, sagittis eget semper nec, dictum non sem. Sed vitae diam ac nibh tincidunt tincidunt eu et sem. Aenean risus risus, pellentesque ac sem ut, dignissim condimentum elit. Nulla aliquam vitae arcu a dapibus.
        
        Donec eu dolor euismod, porta nibh consequat, aliquet dui. Mauris sit amet ligula nec dolor tempor rhoncus. Donec eget malesuada erat. Donec lacus ligula, imperdiet in mauris sit amet, fermentum porttitor justo. Nulla facilisi. Suspendisse blandit imperdiet auctor. Curabitur sapien dui, faucibus eget tellus sed, efficitur laoreet nisl. Proin maximus consectetur nunc. Sed varius eros ligula, in sagittis justo finibus eget. Nam lacinia feugiat risus ut tempus. Etiam in pulvinar mi.
        
        Mauris arcu massa, faucibus nec commodo sed, feugiat non nibh. In ut tellus magna. Phasellus et risus nec lectus egestas sodales. Aenean eu turpis ullamcorper, ullamcorper mi quis, tincidunt leo. Proin nibh tortor, dapibus eget volutpat eget, laoreet id diam. Sed blandit neque augue. Donec et nulla ut risus luctus vestibulum. Nunc non laoreet sapien, a pretium lacus. Fusce sed vestibulum urna, sit amet laoreet lectus. Nunc aliquet magna sapien, ullamcorper egestas ex sagittis nec. Proin in blandit lectus. Fusce eu leo sed nisi dapibus convallis sit amet in purus. Nunc quis gravida felis. Cras leo odio, ultrices ut felis eget, imperdiet aliquet ante. Fusce metus ex, commodo in elit sed, hendrerit egestas augue.
        
        Phasellus imperdiet nisi et accumsan tempus. Proin facilisis purus a porta vulputate. Ut eget pharetra nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam posuere efficitur mi, vitae varius justo varius et. Nulla id dolor turpis. Curabitur efficitur elit vel elit suscipit, a volutpat tortor pretium.
        
        Sed at pellentesque nisl. Nulla ultrices est sit amet aliquet cursus. Nulla vitae ultrices orci, eu blandit ex. Etiam vel vehicula velit. Suspendisse tempus sollicitudin faucibus. Nulla facilisis pretium elementum. Cras eget finibus dui.
        
        Phasellus non justo id ex mollis feugiat. Nunc molestie lectus sed accumsan luctus. Mauris ac tincidunt erat. Proin est tellus, dictum vitae scelerisque at, mattis maximus arcu. Suspendisse nec urna massa. Donec molestie magna orci, quis gravida mauris malesuada in. Aliquam interdum leo in vestibulum iaculis. Ut luctus mauris quis mollis ullamcorper. Sed erat justo, mollis id nulla sit amet, posuere lobortis erat. Nulla facilisi. Proin posuere vulputate nulla, vitae lobortis erat consectetur vel. Nullam lacinia augue neque, id dignissim augue egestas sit amet.
        
        Morbi lorem augue, rhoncus id placerat ac, elementum quis augue. Vivamus imperdiet imperdiet fringilla. Nunc nunc nunc, porttitor in mollis eu, rhoncus vitae odio. Curabitur in dolor dolor. Etiam ut pretium urna, et rutrum sapien. Curabitur laoreet eros vulputate metus sagittis commodo. Suspendisse potenti. Praesent posuere ut urna non facilisis. Curabitur ullamcorper porttitor est, vehicula interdum neque tincidunt at.
        
        Cras a maximus tellus. Proin eget urna et mi lacinia placerat. Aenean nec nulla lobortis, posuere sem in, vehicula metus. Suspendisse tristique id est vel lacinia. Nam vulputate tincidunt turpis, ut finibus enim feugiat eget. Morbi congue congue risus sed porttitor. Ut imperdiet, ligula sed dapibus volutpat, diam tellus ornare est, a mattis turpis sem non ligula. Maecenas mattis dolor eget lacus ullamcorper, sed posuere libero aliquam.
        
        Pellentesque cursus interdum lacus quis interdum. Donec tristique nibh lectus, quis ultricies purus accumsan ac. Cras ac purus vitae nibh volutpat porta. Donec dictum, metus porta rhoncus rhoncus, arcu felis mollis enim, quis euismod tellus mauris non dui. Aliquam faucibus sed enim ut blandit. Vivamus maximus vel arcu molestie ullamcorper. Sed semper varius diam in porta. Aenean quis viverra elit. Quisque pulvinar rhoncus magna, ac hendrerit neque porta at. Suspendisse varius quis mauris eu interdum.
        
        Etiam in ante sagittis, sodales arcu eget, laoreet est. Aliquam dictum ultrices libero sit amet commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non neque eu augue hendrerit rutrum. Aenean hendrerit nibh risus, a sollicitudin lectus porttitor scelerisque. Sed suscipit malesuada enim, ac tincidunt elit laoreet quis. Cras nec auctor eros. Nullam sit amet ultrices sapien. Ut tristique, leo tempor vulputate eleifend, nisi dolor eleifend erat, quis iaculis nisl velit quis ante. Vivamus felis ante, aliquam id diam eu, volutpat varius ex. Vivamus fermentum faucibus nunc, eget feugiat mi dictum quis. Phasellus id placerat felis.
        
        Nullam pharetra mauris vitae tristique vehicula. Phasellus pellentesque luctus tortor non semper. Praesent congue accumsan odio, vitae finibus eros ultricies eu. Vivamus lobortis consectetur justo, ac tristique lectus placerat vitae. Curabitur eget tristique quam. Curabitur placerat lectus neque, et eleifend nisi vulputate feugiat. Fusce vitae augue accumsan, blandit ex laoreet, ultrices lectus. Aenean lacus ante, lacinia ac tortor eget, fermentum tincidunt velit. Curabitur accumsan tortor sit amet orci auctor, ac rhoncus eros condimentum. Pellentesque in massa nec felis facilisis dignissim. Fusce lectus turpis, aliquam a mi nec, luctus lobortis ligula.
        
        Sed bibendum metus nibh, mattis lobortis purus vestibulum quis. Maecenas dictum odio non maximus interdum. Donec eu quam eu tellus euismod sollicitudin. Nam ut tellus leo. Aliquam ac leo sed risus elementum consectetur. Aliquam tempus ultricies risus ac rhoncus. Donec interdum turpis eu orci pellentesque euismod. Cras tincidunt ultricies sem, vitae sodales felis accumsan id. Vivamus quis vestibulum sem. Fusce placerat pretium metus, vel porttitor tellus ultrices non. Nunc fringilla quis diam nec auctor. Vestibulum quis tellus cursus, egestas diam non, pretium turpis.`;
        //Actual test begins

        await t
            .click(profile)
            .click(Selector('button > span').withExactText("View"))
            .click(Selector('#profile-info > button[aria-label="Create entry"]'))
            .click(Selector('button[aria-label="Add Banner"]'))
            .setFilesToUpload('input[name="image"]', ['./testbanner.png'])
            .wait(500)
            .click('div.modalComponent.visible > div.customModal.modalWithoutImgProfile.undefined > button[aria-label="Close"]')
            .typeText('input[id="title"]', datedTestText)
            .typeText('textarea[id="text-area-concert-info"]', template + " " + datedTestText, { paste: true })
            .click('button[aria-label="saveDraft"]')
            .wait(5000)
            ;
    });

    test( "News Publish and Delete Draft", async t => {
        
        let datedTestText = t.testRun.test.name + " " + fullDate;

        //Actual test begins

        await t
            .click(profile)
            .click(Selector('button > span').withExactText("View"))
            .expect(Selector('p').withText(DMY).exists).ok()
            .click(Selector('p').withText(DMY))
            .wait(2000)
            .click(Selector('span').withExactText("Publish"))
            .wait(5000)
            .click('button[aria-label="edit"]')
            .wait(2000)
            .click(Selector('div.flex.items-center.gap-4 > button:nth-child(5) > span').withExactText("Delete"))
            .click('button[aria-label="Delete"]')
            ;
    });