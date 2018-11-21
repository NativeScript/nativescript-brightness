import { Observable, EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { BrightnessModel } from './main-view-model';
import { Slider } from "tns-core-modules/ui/slider";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    let model = new BrightnessModel();
    page.bindingContext = model;
}

export function onSliderLoaded(args) {
    const sliderComponent: Slider = <Slider>args.object;
    sliderComponent.on("valueChange", (sargs) => {
        const page = (<Slider>sargs.object).page;
        const vm = page.bindingContext;
        vm.set("fontSize", (<Slider>sargs.object).value);
    });
  }
