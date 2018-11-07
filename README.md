# iot-potager-demo

IoT gui for a demonstration of a connected flower pot at EDF UNITEP.

## How

It works with a MQTT client (MQTT over websockets) in the browser.

Techno:
* Node
* [yarn](https://yarnpkg.com/lang/en/)
* [MQTT.js](https://github.com/mqttjs/MQTT.js): interaction with MQTT server
* [parcel bundler](https://github.com/parcel-bundler/parcel): bundle + ES6 import
* express.js + less + handlebar: webserver

## Disclaimer

This 'app' is not issue-proof, I've developed it quickly. It has served just as a demo.

---

![image](.github/demo.png?raw=true)