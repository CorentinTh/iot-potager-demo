import ChartJs from 'chart.js'
import {getColor} from "./Utils";

export class Chart {

    constructor(containerID, label, twoAxis = false, borders = false) {
        this.containerID = containerID;
        this.label = label;
        this.maxPointAmout = 50;
        this.isTwoAxis = twoAxis;
        this.borders = borders;
        this.init();
    }

    init() {
        const conf = {
            type: 'line',
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        display: true,
                        time: {
                            // parser: 'HH:mm'
                            // round: 'day'
                        }
                    }]
                },
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                responsiveAnimationDuration: 0
            }
        };

        if (this.isTwoAxis) {
            conf.options.scales.yAxes = [
                {
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks:{
                        suggestedMin:this.borders.min1,
                        suggestedMax:this.borders.max1
                    }
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks:{
                        suggestedMin:this.borders.min2,
                        suggestedMax:this.borders.max2
                    }
                }
            ];
        }else{
            conf.options.scales.yAxes= [{
                ticks:{
                    suggestedMin:this.borders.min,
                    suggestedMax:this.borders.max
                }
            }];    
        }

        

        this.chart = new ChartJs(this.containerID, conf);
    }

    addPoint(value1, value2) {
        this.chart.data.labels.push(Date.now());
        this.chart.data.datasets[0].data.push(value1);
        this.chart.data.datasets[1].data.push(value2);

        if (this.chart.data.datasets[0].data.length > this.maxPointAmout || this.chart.data.datasets[1].data.length > this.maxPointAmout) {
            this.removePoint();
        }

        this.chart.update();
    }

    removePoint() {
        if (this.chart.data.labels.length > this.maxPointAmout) {
            this.chart.data.labels.shift();
        }

        this.chart.data.datasets.forEach((dataset) => {
            if (dataset.data.length > this.maxPointAmout) {
                dataset.data.shift();
            }
        });

        this.chart.update();
    }

    addDataset(label, color, axisID) {
        const conf = {
            label: label,
            data: [],
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: color,
            fill: false,
            spanGaps: true
        };

        if (this.isTwoAxis) {
            conf.yAxisID = axisID;
        }
        const i = this.chart.data.datasets.push(conf);

        return this.chart.data.datasets[i - 1].data
    }
}

//
// {
//     label: this.label,
//         data: [],
//     // borderColor: getColor('--dark'),
//     // pointBackgroundColor: getColor('--dark'),
//     // pointBorderColor: getColor('--dark'),
//     borderColor: getColor('--success'),
//     pointBackgroundColor: getColor('--success'),
//     pointBorderColor: getColor('--success'),
//     backgroundColor:getColor('--success') + '6e',
//     fill: true
// }