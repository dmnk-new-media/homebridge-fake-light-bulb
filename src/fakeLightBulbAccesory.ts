import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service
} from "homebridge";
import {BulbState} from "./fakeLightBulbState.enum";

let hap: HAP;

export = (api: API): void => {
  hap = api.hap;
  api.registerAccessory("homebridge-fake-light-bulb", FakeLightBulb);
};

class FakeLightBulb implements AccessoryPlugin {
  private lightBulbState = BulbState.off;
  private lightBulbBrightness = BulbState.off;
  private lightBulbSaturation = BulbState.off;
  private lightBulbColorTemperature = 140;
  private lightBulbHue = BulbState.off;

  private readonly log: Logging;
  private readonly name: string;
  private readonly api: API;

  private readonly lightBulbService: Service;
  private readonly informationService: Service;

  constructor(log: Logging, config: AccessoryConfig, api: API) {
    this.log = log;
    this.name = config.name;
    this.api = api;

    this.lightBulbService = new hap.Service.Lightbulb;

    this.informationService = new hap.Service.AccessoryInformation()
        .setCharacteristic(hap.Characteristic.Manufacturer, "DMNK")
        .setCharacteristic(hap.Characteristic.SerialNumber, "XD")
        .setCharacteristic(hap.Characteristic.Model, "Fake Light Bulb");

    this.lightBulbService.getCharacteristic(this.api.hap.Characteristic.On)
        .on(CharacteristicEventTypes.GET, this.handleOnGet)
        .on(CharacteristicEventTypes.SET, this.handleOnSet);


    if(config.brightness) {
      this.lightBulbService.getCharacteristic(this.api.hap.Characteristic.Brightness)
          .on(CharacteristicEventTypes.GET, this.handleOnGetBrightness)
          .on(CharacteristicEventTypes.SET, this.handleOnSetBrightness);
    }

    if(config.color === "colorTemperature") {
      this.lightBulbService.getCharacteristic(this.api.hap.Characteristic.ColorTemperature)
          .on(CharacteristicEventTypes.GET, this.handleOnGetColorTemperature)
          .on(CharacteristicEventTypes.SET, this.handleOnSetColorTemperature);
    }

    if(config.color === "hue") {
      this.lightBulbService.getCharacteristic(this.api.hap.Characteristic.Saturation)
          .on(CharacteristicEventTypes.GET, this.handleOnGetSaturation)
          .on(CharacteristicEventTypes.SET, this.handleOnSetSaturation);

      this.lightBulbService.getCharacteristic(this.api.hap.Characteristic.ColorTemperature)
          .on(CharacteristicEventTypes.GET, this.handleOnGetColorTemperature)
          .on(CharacteristicEventTypes.SET, this.handleOnSetColorTemperature);

      this.lightBulbService.getCharacteristic(this.api.hap.Characteristic.Hue)
          .on(CharacteristicEventTypes.GET, this.handleOnGetHue)
          .on(CharacteristicEventTypes.SET, this.handleOnSetHue);
    }
    log.info("Fake Bulb finished initializing!");
  }

  handleOnGet = (callback: CharacteristicGetCallback) => {
    this.log.info("Current state of the bulb was returned: " + (this.lightBulbState ? BulbState.on : BulbState.off));
    callback(undefined, this.lightBulbState);
  }

  handleOnSet = (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    this.lightBulbState = value as number;
    this.log.info("Bulb state was set to: " + (this.lightBulbState ? BulbState.on : BulbState.off));
    callback();
  }


  handleOnGetBrightness = (callback: CharacteristicGetCallback) => {
    this.log.info("Current brightness of the bulb was returned: " +  this.lightBulbBrightness);
    callback(undefined, this.lightBulbBrightness);
  }

  handleOnSetBrightness = (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    this.lightBulbBrightness = value as number;
    this.log.info("Bulb brightness was set to: " +  this.lightBulbBrightness);
    callback();
  }


  handleOnGetSaturation = (callback: CharacteristicGetCallback) => {
    this.log.info("Current saturation of the bulb was returned: " +  this.lightBulbSaturation);
    callback(undefined, this.lightBulbSaturation);
  }

  handleOnSetSaturation = (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    this.lightBulbSaturation= value as number;
    this.log.info("Bulb saturation was set to: " +  this.lightBulbSaturation);
    callback();
  }


  handleOnGetColorTemperature = (callback: CharacteristicGetCallback) => {
    this.log.info("Current color temperature of the bulb was returned: " +  this.lightBulbColorTemperature);
    callback(undefined, this.lightBulbColorTemperature);
  }

  handleOnSetColorTemperature = (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    this.lightBulbColorTemperature= value as number;
    this.log.info("Bulb color temperature was set to: " +  this.lightBulbColorTemperature);
    callback();
  }


  handleOnGetHue = (callback: CharacteristicGetCallback) => {
    this.log.info("Current hue of the bulb was returned: " +  this.lightBulbHue);
    callback(undefined, this.lightBulbHue);
  }

  handleOnSetHue = (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    this.lightBulbHue= value as number;
    this.log.info("Bulb hue was set to: " +  this.lightBulbHue);
    callback();
  }

  getServices(): Service[] {
    return [
        this.lightBulbService,
        this.informationService,
    ];
  }
}