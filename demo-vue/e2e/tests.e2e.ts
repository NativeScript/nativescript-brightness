import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
import { assert } from "chai";
import { isSauceLab, runType } from "nativescript-dev-appium/lib/parser";
import { expect } from "chai";
import "mocha";
const fs = require('fs');
const addContext = require('mochawesome/addContext');
const rimraf = require('rimraf');
const isSauceRun = isSauceLab;
let isAndroid;

describe("sample scenario", () => {
    const defaultWaitTime = 5000;
    let driver: AppiumDriver;

    before(async () => {
        driver = await createDriver();
        driver.defaultWaitTime = 20000;
        isAndroid = driver.isAndroid;
        let dir = "mochawesome-report";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        rimraf('mochawesome-report/*', function () { });
    });

    after(async () => {
        if (isSauceRun) {
            driver.sessionId().then(function (sessionId) {
                console.log("Report: https://saucelabs.com/beta/tests/" + sessionId);
            });
        }
        await driver.quit();
        console.log("Driver successfully quit");
    });

    afterEach(async function () {
        if (this.currentTest.state && this.currentTest.state === "failed") {
            let png = await driver.logScreenshot(this.currentTest.title);
            fs.copyFile(png, './mochawesome-report/' + this.currentTest.title + '.png', function (err) {
                if (err) {
                    throw err;
                }
                console.log('Screenshot saved.');
            });
            addContext(this, './' + this.currentTest.title + '.png');
        }
    });

    it("should find an element by text", async () => {
        const title = await driver.findElementByText("NativeScript-Vue Brightness demo");
        expect(title).to.exist;

        const locator = driver.isAndroid ? "android.widget.SeekBar" : "XCUIElementTypeSlider"
        const slider = driver.findElementByClassName(locator);
        expect(slider).to.exist;
        
        const lowerBoundary = driver.findElementByText("0");
        expect(lowerBoundary).to.exist;
        const upperBoundary = driver.findElementByText("100");
        expect(upperBoundary).to.exist;
    });
});