import * as applicationModule from "tns-core-modules/application/application";

export class Brightness {
    public getNative() {
        let context = applicationModule.android.context;
        return org.nativescript.brightness.Brightness.getScreenBrightness(context);
    }

    public get() {
        return Math.round(this.getNative() / 255 * 100);
    }

    public set(options) {
        let context = applicationModule.android.foregroundActivity;
        let brightnessValue = Math.round(options.intensity * 255 / 100);
        org.nativescript.brightness.Brightness.setScreenBrightness(context, brightnessValue);
    }
}
