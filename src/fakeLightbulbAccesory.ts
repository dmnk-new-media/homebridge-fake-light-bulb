import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  HAP,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  Logging,
  Service
} from "homebridge";
import {BulbState} from "./fakeLightBulbState.enum";

let hap: HAP;

export = (api: API) => {
  hap = api.hap;
  api.registerAccessory("homebridge-fake-light-bulb", FakeLightBulb);
};

class FakeLightBulb implements AccessoryPlugin {
  private lightBulbState = BulbState.off;
  private lightBulbBrightness = BulbState.off;

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

    log.info("Fake Bulb finished initializing!");
  }

  handleOnGet = (callback: CharacteristicGetCallback) => {
    this.log.info("Current state of the bulb was returned: " + this.lightBulbState );
    callback(undefined, this.lightBulbState);
  }

  handleOnSet = (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    this.lightBulbState = value as number;
    this.log.info("Bulb state was set to: " + this.lightBulbState);
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


  getServices(): Service[] {
    return [
        this.lightBulbService,
        this.informationService,
    ];
  }
}