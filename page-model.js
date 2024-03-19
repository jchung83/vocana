import { Selector, t } from 'testcafe';

const label = Selector('label');
const input = Selector('input');
const button = Selector('button');
const span = Selector('span');

export class User {
    constructor(uemail, upassword) {
        this.email = uemail
        this.password = upassword 
    }
}

export const admin = new User('admin@sparxworks.com', 'Admin#2024');
export const artist = new User('art@art.com', 'Aa.123456' );
export const fan = new User('fan@fan.com','Aa.123456');
export const fake =new User('fake@fake.com', 'notworking');

/*
* Login page
*/

export class LoginPage {
    constructor () {
        this.emailInput = Selector('#Email');
        this.passInput = Selector('#Password');
        this.rememberMe = label.withText("Remember me");
        this.rememberMeCheck = Selector('input[id="rememberMe"]');
        this.loginButton = span.withText("Log In");
        this.errorLogin = span.withText("Invalid email or password.");
    }
    async login (username) {
        await t
        .typeText(this.emailInput, username.email)
        .typeText(this.passInput, username.password)
        .click(this.loginButton)
    }
}

export class HomePage {
    constructor () {
        this.menuProfile = Selector('a[aria-label="Navigate to Profile"]');
        this.menuHome = Selector('a[aria-label="Navigate to Home"]');
        this.menuMusic = Selector('a[aria-label="Navigate to Music"]');
        this.menuMerch = Selector('a[aria-label="Navigate to Merch"]');
        this.liveStream = Selector('a[aria-label="Navigate to Livestream"]');
        this.liveStream = Selector('a[aria-label="Navigate to Search"]');

        this.liveStream = Selector('a[aria-label="Navigate to Notifications"]');
        this.liveStream = Selector('a[aria-label="Navigate to Messages"]');

        this.liveStream = Selector('a[aria-label="Navigate to Concerts"]');
        this.liveStream = Selector('a[aria-label="Navigate to Audience"]');
        this.liveStream = Selector('a[aria-label="Navigate to Wallet"]');
        this.liveStream = Selector('a[aria-label="Navigate to Settings"]');
        this.liveStream = Selector('button[aria-label="Log Out"]');    
    }
}
