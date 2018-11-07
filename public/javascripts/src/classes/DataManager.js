import {Chart} from "./Chart";
import {Box} from "./Box";
import {getColor, shadeColor} from "./Utils";
import {Switch} from "./Switch";
import {MqttHandler} from "./MqttHandler";

export class DataManager{

    constructor() {
        this.mqttHandler = new MqttHandler();
        this.mqttHandler.onData(this.setData.bind(this));

        this.init();
    }

    init(){
        this.chart1 = new Chart('chart-1', 'Evolution de la temperature', false, {min:-10, max:35});
        this.chart1.addDataset('Temperature de l\'air', getColor('--success'));
        this.chart1.addDataset('Temperature du sol', shadeColor(getColor('--success'), 10));

        this.chart2 = new Chart('chart-2', 'Evolution de la temperature', false, {min:0, max:100});
        this.chart2.addDataset('Hygrometrie de l\'air', getColor('--info'));
        this.chart2.addDataset('Hygrometrie du sol', shadeColor(getColor('--info'), 10));

        this.chart3 = new Chart('chart-3', 'Evolution de la temperature', true, {min1:900, max1:1100, min2:0,max2:800});
        this.chart3.addDataset('Pression', getColor('--dark'), 'A');
        this.chart3.addDataset('Luminosite', getColor('--warning'), 'B');

        this.boxTempSol = new Box('box-temp-sol', 'Temp. sol', '°C');
        this.boxTempAir = new Box('box-temp-air', 'Temp. air', '°C');
        this.boxHygroSol = new Box('box-hygro-sol', 'Hygro. sol', '%');
        this.boxHygroAir = new Box('box-hygro-air', 'Hygro. air', '%');
        this.boxLuminosite = new Box('box-luminosite', 'Luminosite', 'L');
        this.boxPression = new Box('box-pression', 'Pression', 'hpa');

        this.switchLuminosite = new Switch('switch-light');
        this.switchLuminosite.onToogle(this.mqttHandler.sendLightState.bind(this.mqttHandler));
        this.mqttHandler.onNewLightState(this.switchLuminosite.setState.bind(this.switchLuminosite));

        this.switchArrosage = new Switch('switch-arrosage');
        this.switchArrosage.onToogle(this.mqttHandler.sendArrosageState.bind(this.mqttHandler));
    }

    setData(data){
        if(data && data.BME280 && data.BH1750){

            const tempAir = data.BME280.Temperature;
            const hygroAir = data.BME280.Humidity;
            const pressure = data.BME280.Pressure;
            const luminance = data.BH1750.Illuminance;

            this.boxPression.setValue(pressure);
            this.boxHygroAir.setValue(hygroAir);
            this.boxTempAir.setValue(tempAir);
            this.boxLuminosite.setValue(luminance);

            this.chart1.addPoint(tempAir, null);
            this.chart2.addPoint(hygroAir, null);
            this.chart3.addPoint(pressure, luminance);

        }else if (data){
            this.chart2.addPoint(null, data);
            this.boxHygroSol.setValue(data)
        }else{
            console.error('Wrong data format');
        }
    }
}