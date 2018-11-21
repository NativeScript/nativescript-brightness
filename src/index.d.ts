export declare class Brightness {
  public getNative(): number;

  public get(): number;

  public set(options: BrightnessOptions);
}

export interface BrightnessOptions {
  /**
   * Defines the desired brightness value, which should be a number between 0.0 and 1.0.
   */
  intensity: number;
}