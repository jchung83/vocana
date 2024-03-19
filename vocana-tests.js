import { Selector } from 'testcafe';
import { LoginPage, User } from './page-model'; // Import User separately
import { admin } from './page-model';

const loginPage = new LoginPage();


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
    
    test( "Login Admin", async t => {
        await
        loginPage.login(admin);
    });