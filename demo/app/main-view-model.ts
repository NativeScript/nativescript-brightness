import { Observable, PropertyChangeData } from 'tns-core-modules/data/observable';
import { Brightness } from 'nativescript-brightness';

export class BrightnessModel extends Observable {
  public message: string;
  public currentValue: number;
  public sliderValue: number;
  public minValue: number;
  public maxValue: number;
  private brightness: Brightness;

  constructor() {
    super();

    this.brightness = new Brightness();
    this.minValue = 0;
    this.maxValue = 100;
    this.currentValue = this.brightness.get();
    this.sliderValue = this.currentValue;
    this.setMessage();

    let model = this;
    this.on(Observable.propertyChangeEvent, (propertyChangeData: PropertyChangeData) => {
      if (propertyChangeData.propertyName === "sliderValue") {
        let value = Math.round(propertyChangeData.value);
        model.brightness.set({ intensity: value });
        model.set("currentValue", value);
        model.setMessage();
      }
    });
  }

  private setMessage(): void {
    this.set("message", `Your screen brightness is ${this.currentValue}`);
  }
}
