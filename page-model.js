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
export const artist = new User('artist@artist.com', 'Aa.123456' );
export const fan = new User('fan@fan.com','Aa.123456');
export const fake =new User('fake@fake.com', 'notworking');

export class LoginPage {
    constructor () {
        this.emailInput = Selector('#Email');
        this.passInput = Selector('#Password');
        this.rememberMe = Selector('label[for="rememberMe"]');
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

export class AdminLoginPage {
    constructor () {
        this.emailInput = Selector('#email');
        this.passInput = Selector('#password');
        this.rememberMe = Selector('label[for="rememberMe"]');
        this.rememberMeCheck = Selector('input[id="rememberMe"]');
        this.loginButton = span.withText("Log In");
        this.errorLogin = span.withText("errorInvalidEmailPassword");
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
        this.menuStream = Selector('a[aria-label="Navigate to Livestream"]');
        this.menuSearch = Selector('a[aria-label="Navigate to Search"]');

        this.menuNotifications = Selector('a[aria-label="Navigate to Notifications"]');
        this.menuMessages = Selector('a[aria-label="Navigate to Messages"]');

        this.menuConcerts = Selector('a[aria-label="Navigate to Concerts"]');
        this.menuAudience = Selector('a[aria-label="Navigate to Audience"]');
        this.menuWallet = Selector('a[aria-label="Navigate to Wallet"]');
        this.menuSettings = Selector('a[aria-label="Navigate to Settings"]');
        this.menuLogout = Selector('button[aria-label="Log Out"]');

    }
    async checkmenuartist () {
        await t
        .expect(this.menuProfile.exists).ok()
        .expect(this.menuHome.exists).ok()
        .expect(this.menuMusic.exists).ok()
        .expect(this.menuMerch.exists).ok()
        .expect(this.menuStream.exists).ok()
        .expect(this.menuSearch.exists).ok()

        .expect(this.menuNotifications.exists).ok()
        .expect(this.menuMessages.exists).ok()

        .expect(this.menuConcerts.exists).ok()
        .expect(this.menuAudience.exists).ok()
        .expect(this.menuWallet.exists).ok()
        .expect(this.menuSettings.exists).ok()
        .expect(this.menuLogout.exists).ok()
    }
    async checkmenufan () {
        await t
        .expect(this.menuProfile.exists).ok()
        .expect(this.menuHome.exists).ok()
        .expect(this.menuMusic.exists).ok()
        .expect(this.menuMerch.exists).ok()
        .expect(this.menuStream.exists).ok()
        .expect(this.menuSearch.exists).ok()

        .expect(this.menuNotifications.exists).ok()
        .expect(this.menuMessages.exists).ok()

        .expect(this.menuConcerts.exists).notOk()
        .expect(this.menuAudience.exists).ok()
        .expect(this.menuWallet.exists).ok()
        .expect(this.menuSettings.exists).ok()
        .expect(this.menuLogout.exists).ok()
    }
}

export class AdminHomePage {
    constructor () {
        this.menuProfile = Selector('a[aria-label="Navigate to Profile"]');

        this.menuHome = Selector('a[aria-label="Navigate to Home"]');
        this.menuInternalManager = Selector('a[aria-label="Navigate to Internal Manager"]');
        this.menuUserManager = Selector('a[aria-label="Navigate to User Manager"]');
        this.menuSupportManager = Selector('a[aria-label="Navigate to Support Manager"]');
        this.menuReconciliation = Selector('a[aria-label="Navigate to Reconciliation"]');

        this.menuLogout = Selector('button[aria-label="Log Out"]');

    }
    async checkmenuadmin () {
        await t
        .expect(this.menuProfile.exists).ok()
        .expect(this.menuInternalManager.exists).ok()
        .expect(this.menuUserManager.exists).ok()
        .expect(this.menuSupportManager.exists).ok()
        .expect(this.menuReconciliation.exists).ok()

        .expect(this.menuLogout.exists).ok()
    }
}

export class ArtistProfilePage {
    constructor () {

        //Header
        this.editProfileButton = Selector('button[aria-label="Edit Profile"]');
        this.carouselImg0 = Selector('div[data-index="0"]');
        this.carouselImg0 = Selector('div[data-index="1"]');
        this.profileCarouselNext = Selector('#imgCarrousel > div > div.slick-arrow.slick-next > button');
        this.profileCarouselPrev = Selector('#imgCarrousel > div > div.slick-arrow.slick-prev > button');
        

        this.createPost = span.withText('Create Post');

    }
}