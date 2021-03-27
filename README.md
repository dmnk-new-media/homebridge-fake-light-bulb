
<p align="center">

<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">

</p>


# Homebridge Fake Light Bulb

### Installation
To install Homebridge Fake Light Bulb:
- Follow the instructions on the [Homebridge Wiki](https://github.com/homebridge/homebridge/wiki) to install Homebridge
- Install the Homebridge Fake Light Bulb plugin through Homebridge Config UI X or manually by:
  ```
  sudo npm -g i homebridge-fake-light-bulb
  ```

### Configuration

- Config the Fake Light Bulb plugin through Homebridge Config UI X or manually by:
```
  "accessories": [
        {
            "name": "Fake Light Bulb",
            "brightness": true,
            "accessory": "homebridge-fake-light-bulb"
        }
    ]
  ```
Key | Default | Description
-------- | ----------- | -----------
`name` | Fake Light Bulb | Name of your fake light bulb
`brightness` | false | Flag whether to expose brightness input field. 