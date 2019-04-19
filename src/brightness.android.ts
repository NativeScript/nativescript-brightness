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
            const attr = topmost().android.activity.getWindow().getAttributes();
            attr.screenBrightness = options.intensity / 100;
            topmost().android.activity.getWindow().setAttributes(attr);
        } else {
            let context = applicationModule.android.foregroundActivity;
            let brightnessValue = Math.round(options.intensity * 255 / 100);
            org.nativescript.brightness.Brightness.setScreenBrightness(context, brightnessValue);
        }
    }
}
