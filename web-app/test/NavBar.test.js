const puppeteer = require("puppeteer");

let browser, page;

const baseURL = "http://localhost:3000";
const chrome_path = "/usr/bin/google-chrome/manav"

beforeAll(async()=>{
	browser  = await puppeteer.connect({ browserURL: 'http://localhost:9223' });
	page = await browser.newPage();

	await page.goto(baseURL);

	const targets = browser.targets();
	console.log(targets);
	// const extensionTarget = targets.find(target => target.url().includes('chrome-extension'));
	// const partialExtensionUrl = extensionTarget.url() || '';
	// const [, , extensionId] = partialExtensionUrl.split('/');
})

describe("Navabar testing",()=>{

	const userProfileBtnSelector =  "section.user_profile";
	const profileslider = ".profile_slider";
	const walletSelector = "div.wallet"

	it("should open the slider on connect button",async ()=>{
		await page.click(userProfileBtnSelector)
		await page.waitForSelector(profileslider)
		const classes = await page.evaluate((profileslider)=>{
			return document.querySelector(profileslider).className;
		},profileslider)

		expect(classes).toContain("profile_slider fixed h-full sm:py-2 sm:pr-2 ease-in-out sm:right-0 z-10 duration-1000 sm:w-fit w-full sm:bg-transparent bg-slate-400 bg-opacity-20")
	})

	it("should open Metamask popup", async()=>{
		await page.click(walletSelector)
	})


})

afterAll(async()=>{
	// await browser.close()
})