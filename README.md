# Tests for Vocana

## Running tests
Tests can be run from TestCafe folder with command:

```
npm run {testname}
```

## Current tests

### Artist account tests
Run with `artist-tests` as the test name.

TestCafe will automatically login before each test using hardcoded credentials.
Current tests, in order, include:
- [x] Going to **Profile** page and creating a text only post
- [x] Going to **Profile** page and creating a post with text and image (you have 20secs to manually select the image file when prompted)
- [x] Going to **Search** page and performing a search validating results are populating and afterwards trying to apply a filter
- [x] Going to **Search** page, performing a search, selecting a song, verifyng song plays correctly and controls work
- [x] Creating an managing **Concerts** (save draft, edit, publish, unpublish, delete) the test also verifies if the concert appears in the correct list (either drafts or upcoming or neither)
- [x] Creating a **News** draft
- [x] Editing a **News** draft and delete the published new

### Fan account tests
Run with `fan-tests` as the test name.

- [x] Creating and managing playlists
- [x] Composing messages, testing for duplicity of conversations and testing for duplication on sending messages (double enter and double click)

### Admin account tests
Run with `admin-tests` as the test name.

#### Internal Manager operation tests
- [x] Access Manager tests
- [x] Vocana Documents tests

#### User Manager operation tests
- [x] Vocana Users tests including search, fields prepopulating and sending message

### Account creation tests
Run with `account-tests` as the test name.

- [x] Create an account as artist
- [x] Create an account as fan

## Extra features
Inside tests you can use variable `datedTestText` to get a string with the current test name and current date, that you can use as input to generate a visual representation to check against with the `expect` method.

