const browser = require('./src/browser');
const scraperController = require('./src/controller/page');

scraperController(browser.launch());
