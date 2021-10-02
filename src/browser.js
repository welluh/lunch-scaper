const puppeteer = require('puppeteer');

async function launch() {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--disable-setuid-sandbox', '--disable-dev-shm-usage'],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }

    return browser;
}

module.exports = {
    launch,
};
