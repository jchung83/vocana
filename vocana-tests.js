import { Selector } from 'testcafe';
import { LoginPage, User, HomePage, AdminLoginPage, AdminHomePage } from './page-model'; // Import User separately
import { admin, artist, fan, fake } from './page-model';

const loginPage = new LoginPage();
const homePage = new HomePage();
const adminLoginPage = new AdminLoginPage();
const adminHomePage = new AdminHomePage();

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


fixture ('Login Page')
    .page ('https://appv2.vocana.co/')
    .beforeEach ( async t => {
    await t.resizeWindow(1600, 720)
    });
    
    test( "Artist login and Main menu", async t => {
        await loginPage.login(artist);
        await homePage.checkmenuartist();
    });

    test( "Fan login and Main menu", async t => {
        await loginPage.login(fan);
        await homePage.checkmenufan();
    });

    test( "Failed login attempt", async t => {
        await loginPage.login(fake);
        await t
        .expect(loginPage.errorLogin.exists).ok()
    });

    test( "Remember Me Checkbox", async t => {
        await t
            .click(loginPage.rememberMe)
            .expect(loginPage.rememberMeCheck.checked).ok()
    });

fixture ('Admin Login Page')
    .page ('https://adminv2.vocana.co/')
    .beforeEach ( async t => {
        await t.resizeWindow(1600, 720)
        });

    test( "Admin login and Main menu", async t => {
        await adminLoginPage.login(admin);
        await adminHomePage.checkmenuadmin();
    });

    test( "Admin failed login attempt", async t => {
        await adminLoginPage.login(fake);
        await t
        .expect(adminLoginPage.errorLogin.exists).ok()
    });

    test( "Admin Remember Me Checkbox", async t => {
        await t
            .click(adminLoginPage.rememberMe)
            .expect(adminLoginPage.rememberMeCheck.checked).ok()
    });