const puppeteer = require('puppeteer');

const lorem = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

const delay = async function (timeout) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};
const nextcloudUrl = 'https://nextcloud.local/index.php/apps/text/';
const data = 1;
(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	const page = await browser.newPage();
	await page.goto('https://nextcloud.local.dev.bitgrid.net/index.php/login', {waitUntil: 'networkidle0'});
	await page.type('#user', 'admin');
	await page.type('#password', 'admin');
	const inputElement = await page.$('input[type=submit]');
	await inputElement.click();
	await page.waitForNavigation({waitUntil: 'networkidle2'});
	await page.waitForSelector('#header');
	await page.goto(nextcloudUrl);
	await page.waitForSelector('.ProseMirror');
	await page.focus('.ProseMirror')
	delay(3000);
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('Enter');
	await page.keyboard.type(lorem, {delay: 80});
	await page.keyboard.press('Enter');
	await page.keyboard.type(lorem, {delay: 20});
	delay(3000);
	await page.screenshot({path: '' + data + '.png'});
	await page.close();
})();

