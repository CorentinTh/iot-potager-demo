export class MqttHandler {
    constructor() {

        this.callbackData = () => {};
        this.callbackNewLightState = () => {};

        this.client = mqtt.connect('ws://192.168.1.103:1884');

        this.client.subscribe('tele/potager/SENSOR');
        this.client.subscribe('tele/earth_sensor/humidite');
        this.client.subscribe('stat/potager/POWER1');

        this.client.on('message', (topic, payload) => {
            console.log(topic);
            if(['tele/earth_sensor/humidite', 'tele/potager/SENSOR'].indexOf(topic) !== -1){
                const data = JSON.parse(payload.toString());

                console.log(data);
                this.callbackData(data);
            }else if (topic === 'stat/potager/POWER1') {
                this.callbackNewLightState(payload.toString() === 'ON');
            }
        });
    }

    onData(callback) {
        this.callbackData = callback;
    }

    sendLightState(state) {
        console.log('Sending light state');
        this.client.publish('cmnd/potager/POWER', state ? 'ON' : 'OFF');
    }

    sendArrosageState(state) {
        console.log('Sending arrosage state');
        this.client.publish('cmnd/potager/arrosage', state ? 'ON' : 'OFF');
    }

    onNewLightState(callback) {
        this.callbackNewLightState = callback;
    }
}