const assert = require('assert');
const spell = require('spell-checker-js');


// (1) Making sure images and graphics are all visible
describe('Verify Images and Graphics', () => {
    it('should verify that all images and graphics are visible', () => {
        browser.url('https://internet.frontier.com');
        const images = browser.isVisible('<img>');
        images.forEach((item) => assert(item === true));
    });

    it('should verify that all icons are visible', () => {
        browser.url('https://internet.frontier.com');
        const icons = browser.isVisible('<i>');
        icons.forEach((item) => (item === true));
    });
});

// (2) Making sure prices, phone numbers, and timer are formatted correctly (using regex)	

    describe('Verify Prices, Phone Numbers and Timer', () => {
        it('should verify that all prices are formatted properly', () => {
            browser.url('https://internet.frontier.com');

            const priceCurrency = browser.getText('.price__currency');
            const priceDollars = browser.getText('.price__dollars');
            const priceCents = browser.getText('.price__cents');
            const priceFrequency = browser.getText('.price__frequency');
            assert(priceCurrency === '$'); 
            assert(!isNaN(parseInt(priceDollars)));        
        });

        it('should verify that all phone numbers are formatted properly', () => {
            browser.url('https://internet.frontier.com');
            const phoneNumbers = browser.getText('span[data-fuse-format]');
            phoneNumbers.forEach((phoneNumber) => {
                assert(/^(?:(?:\+?1\s*(?:[.]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(phoneNumber)); 
            });
        });
    });

// (3) Making sure form is validated 	

// a. submit form without entering any information 
    
    describe('Verify Form Validation', () => {
        it('should not allow form submission when blank', () => {
            browser.url('https://internet.frontier.com');
            browser.addValue('.js-track-form-zip', '');
            browser.click('#js-track-form-check-availability');
            const url = browser.getUrl();
            assert(url === 'https://internet.frontier.com/');
        });
// b. submit form by entering incorrect information
        it('should not allow form submission with incorrect information', () => {
            browser.url('https://internet.frontier.com');
            browser.addValue('.js-track-form-zip', 'dsfsfsf');
            browser.click('#js-track-form-check-availability');
            const url = browser.getUrl();
            assert(url === 'https://internet.frontier.com/');
        });
// c. submit form by entering valid information
        it('should allow form submission with correct information', () => {
            browser.url('https://internet.frontier.com');
            browser.addValue('.js-track-form-zip', '28288');
            browser.click('#js-track-form-check-availability');
            const url = browser.getUrl();
            assert(url === 'https://internet.frontier.com/plans-pricing.html');
        });
    });

// (4) Making sure links direct correctly		

describe('Verfiy Links', () => {
    it('should verify that all links work properly', () => {
        browser.url('https://internet.frontier.com');
        const links = browser.getAttribute('a', 'href');
        const filteredLinks = links.filter((link) => {
            return link === null;
        });

        assert(filteredLinks[0] === undefined); 
    });
});
