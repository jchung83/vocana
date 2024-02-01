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
- [] Going to **Search** page, performing a search, selecting a song, verifyng song plays correctly and controls work

### Fan account tests
Run with `fan-tests` as the test name.

- []

### Account creation tests
Run with `account-tests` as the test name.

- [] Create an account as artist
- [] Create an account as fan

## Extra features
Inside tests you can use variable `datedTestText` to get a string with the current test name and current date, that you can use as input to generate a visual representation to check against with the `expect` method.

