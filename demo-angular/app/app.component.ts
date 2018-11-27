import { Component } from '@angular/core';
import { Brightness } from 'nativescript-brightness';
import { Slider } from "tns-core-modules/ui/slider";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    public brightness = new Brightness();
    public currentValue = this.brightness.get();
    public sliderValue = this.currentValue;
    public message = this.getMessage();
    public onSliderValueChange(args) {
        let slider = <Slider>args.object;
        let value = Math.round(slider.value);
        if (value !== this.currentValue) {
            this.brightness.set({ intensity: value });
            this.currentValue = value;
            this.message = this.getMessage();
        }
    }
    public getMessage() {
        return `Your screen brightness is ${this.currentValue}`;
    }
}
