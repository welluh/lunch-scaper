async function prepareData(browser, url) {
    try {
        const page = await browser.newPage();

        await page.goto(url);
        await page.waitForSelector('.restaurant-single-view');

        // Fetch all lunch list elements
        const nameElement = await page.waitForSelector('[itemprop="name"]');
        const name = await nameElement.evaluate(el => el.textContent.replace(/[^\S ]+/g, ''));

        const addressElement = await page.waitForSelector('[itemprop="address"]');
        const address = await addressElement.evaluate(el => el.textContent.replace(/[^\S ]+/g, ''));

        const openingHoursElement = await page.waitForSelector('[itemprop="openingHours"]');
        const openingHours = await openingHoursElement.evaluate(el => el.textContent.replace(/[^\S ]+/g, ''));

        const list = await page.$$eval('#menu .item', items => {
            return items.map(item => {
                return {
                    date: item.querySelector('.item-header')?.textContent,
                    content: [...item.querySelectorAll('.item-body ul li')].map(text => text.textContent),
                };
            })
            .filter(({ content }) => content.length > 0);
        });

        await page.close();

        return {
            name,
            address,
            openingHours,
            list,
        };
    } catch (err) {
        console.error(err);
    }
};

module.exports = prepareData;
