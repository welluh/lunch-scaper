const fs = require('fs');
const scrapeFromLounaatInfo = require('../scraper/lounaat-info');

async function scrape(browserInstance) {
    let browser;

    try {
        browser = await browserInstance;

        const urls = [
            'https://www.lounaat.info/lounas/alice-italian/helsinki',
            'https://www.lounaat.info/lounas/on-the-rocks-kallio/helsinki',
            'https://www.lounaat.info/lounas/weeruska/helsinki',
        ];

        const scrapedData = await Promise.all(
            urls.map(url => scrapeFromLounaatInfo(browser, url)),
        );

        await browser.close();

        fs.writeFile("data.json", JSON.stringify(scrapedData, null, 4), 'utf8', function(err) {
            if (err) {
                return console.error(err);
            }

            console.log("Data has been scraped and saved successfully! View it at './data.json'");
        });
    } catch(err) {
        console.error('Could not resolve the browser instance => ', err);
    }
}

module.exports = (browser) => scrape(browser);
