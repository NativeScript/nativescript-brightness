import * as utils from "tns-core-modules/utils/utils";

export class Brightness {
    public getNative() {
        let screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        let currentBrightness = screen.brightness;
        return currentBrightness;
    }

    public get() {
        let currentBrightness = Math.round(this.getNative() * 100);
        return currentBrightness;
    }

    public set(options) {
        let screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        screen.brightness = options.intensity / 100;
    }
}
