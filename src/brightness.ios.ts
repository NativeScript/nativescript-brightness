import * as utils from "tns-core-modules/utils/utils";
import { validateOptions } from './brightness.common';

export class Brightness {
    public getNative() {
        let screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        let currentBrightness = screen.brightness;
        return currentBrightness;
    }

    public get() {
        return Math.round(this.getNative() * 100);
    }

    public set(options) {
        validateOptions(options);
        let screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        screen.brightness = options.intensity / 100;
    }
}
