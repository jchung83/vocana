Tests for Vocana

Tests can be run from TestCafe folder with command:

```
npm run testvocana
```

TestCafe will automatically login before each test using hardcoded credentials.

Inside tests you can use variable _datedTestText_ to get a string with the current test name and current date, that you can use as input to generate a visual representation to check against with the expect method.

Current tests, in order, include:
- Going to **Profile** page and creating a text only post
- Going to **Profile** page and creating a post with text and image (you have 20secs to manually select the image file when prompted)
- Going to **Search** page and performing a search validating results are populating and afterwards trying to apply a filter