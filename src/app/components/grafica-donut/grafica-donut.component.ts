import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica-donut',
  templateUrl: './grafica-donut.component.html',
  styles: [
  ]
})
export class GraficaDonutComponent implements OnInit {

    // Doughnut
    // public chartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    // public doughnutChartData: MultiDataSet = [
    //     [350, 450, 100],
    //     [50, 150, 120],
    //     [250, 130, 70],
    // ];
    // public doughnutChartType: ChartType = 'doughnut';

    @Input() chartLabels: Label[];
    @Input() chartData: Label[];
    @Input() chartType: Label[];
    @Input() titulo: string;

    // 'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
    // 'data': [24, 30, 46],
    // 'type': 'doughnut',
    // 'leyenda': 'El pan se come con'

    constructor() { }

    ngOnInit(): void {
    }

}
