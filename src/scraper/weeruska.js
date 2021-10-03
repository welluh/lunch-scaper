const { weekdays } = require('../utils/constants');

async function prepareData(browser, url) {
    try {
        const page = await browser.newPage();

        await page.goto(url);
        await page.waitForSelector('#main');

        // Fetch all lunch list elements
        const scrapedData = await page.$$eval('.responsive-tabs__list__item', items => {
            return items.map(item => {
                const content = page.querySelector(`[aria-labelledby="${item.id}"]`);
                const text = content.querySelector('h4 + p');

                return {
                    title: item.textContent,
                    content: [text.textContent],
                };
            });
        });

        const data = scrapedData;

        await page.close();

        return data;
    } catch (err) {
        console.error(err);
    }
};

module.exports = prepareData;
