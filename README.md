angular-init - Work in Progress
============

* Koa
* gulp
* browserify
* stylus
* angular

#### Install
  ```$ clone && npm install && bower install && npm install gulp -g```

#### Run
  ```$ gulp ```

#### Test
  ```$ gulp karma```

This will test in Chrome and IE8 (WinXP) via Virtualbox. You can install IE8 via ```node_modules/.bin/iectrl install 8,WinXP```

#### E2E-Test
  ```gulp webdriver```
  Will install and start the selenium server for protractor. This is just a shortcut for ```./node_modules/.bin/webdriver-manager update && ./node_modules/.bin/webdriver-manager start```

  ```gulp protractor```
  Runs the e2e tests.

-----
angular and browserify setup is mostly from https://github.com/pilwon/ultimate-seed