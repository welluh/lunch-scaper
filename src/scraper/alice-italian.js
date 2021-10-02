const { weekdays } = require('../utils/constants');

async function prepareData(browser, url) {
    try {
        const page = await browser.newPage();

        await page.goto(url);
        await page.waitForSelector('#PAGES_CONTAINER');

        // Fetch all lunch list elements
        const scrapedData = await page.$$eval('[role="gridcell"]', items => {
            return items.map(item => {
                return {
                    title: item.querySelector('h4')?.textContent,
                    content: [...item.querySelectorAll('p')].map(text => text.textContent),
                };
            });
        });

        // Organize data to mon-fri order in a readable format
        const data = scrapedData
            .filter(obj => obj.title)
            .filter(obj => {
                const [ title ] = obj.title.split(/(\s|\n)/);

                return weekdays.includes(title.toLowerCase());
            })
            .map(obj => {
                return {
                    ...obj, 
                    title: obj.title.replace(' ', '').replace(/\n/, ' '), 
                };
            })
            .sort((a, b) => {
                const first = a.title.replace(/\s.*\d.*/, '');
                const second = b.title.replace(/\s.*\d.*/, '');

                return weekdays.indexOf(first.toLowerCase()) - weekdays.indexOf(second.toLowerCase());
            });

        await page.close();

        return data;
    } catch (err) {
        console.error(err);
    }
};

module.exports = prepareData;
