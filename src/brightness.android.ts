import * as applicationModule from "tns-core-modules/application/application";
import { topmost } from "tns-core-modules/ui/frame";
import { validateOptions } from './brightness.common';

export class Brightness {
    public getNative() {
        let context = applicationModule.android.context;
        return org.nativescript.brightness.Brightness.getScreenBrightness(context);
    }

    public get() {
        return Math.round(this.getNative() / 255 * 100);
    }

    public set(options) {
        validateOptions(options);

        if (android.os.Build.VERSION.SDK_INT < 23) {
            const topFrame = topmost();
            if (topFrame && topFrame.android && topFrame.android.activity) {
                const attr = topFrame.android.activity.getWindow().getAttributes();
                attr.screenBrightness = options.intensity / 100;
                topFrame.android.activity.getWindow().setAttributes(attr);
            }
        } else {
            let context = applicationModule.android.foregroundActivity;
            if (context) {
                let brightnessValue = Math.round(options.intensity * 255 / 100);
                org.nativescript.brightness.Brightness.setScreenBrightness(context, brightnessValue);
            }
        }
    }
}
