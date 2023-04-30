import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let page;
    let browser;
    jest.setTimeout(8000);
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .detailsBtn');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .detailsBtn');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });

    test('if the user hasnt searched for a city, show all upcoming events', async () => {
        const events = await page.$$('.event');
        expect(events).toHaveLength(2);
    })

    test('user should see a list of suggestions when searching for a city', async () => {
        await page.type('.city', 'Berlin');
        const suggestions = await page.$$('.suggestions li');
        expect(suggestions).toHaveLength(2);
    });

    test('user should be able to click on the suggested city', async () => {
        await page.click('.suggestions li:nth-child(1)');
        const input = await page.$eval('.city', el => el.value);
        expect(input).toBe('Berlin, Germany');

        const events = await page.$$('.event');
        expect(events).toHaveLength(1);
    });
});