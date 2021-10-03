const fs = require('fs');
const scrapeAliceItalian = require('../scraper/alice-italian');
const scrapeWeeruska = require('../scraper/weeruska');

async function scrape(browserInstance) {
    let browser;

    try {
        browser = await browserInstance;

        const scrapedData = [];
        
        scrapedData.push({
            name: 'Alice Italian',
            url: 'https://www.aliceitalian.fi/lounas',
            data: await scrapeAliceItalian(browser, 'https://www.aliceitalian.fi/lounas'),
        });

        scrapedData.push({
            name: 'Weeruska',
            url: 'https://weeruska.com/lounaslista',
            data: await scrapeWeeruska(browser, 'https://weeruska.com/lounaslista')
        });

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
