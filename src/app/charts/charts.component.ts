import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit{
  
  title = 'ng2-charts-demo';

  @Input() pieChartData:number[]=[]; // [ 300, 500, 100 ]
  @Input() lineChartDataset:number[]=[]; // [ 65, 70, 80, 81, 75, 79, 79]
  // @Input() pieChartLabel:string[]=[]
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May'
    ],
    datasets: [
      {
        data: this.lineChartDataset,
        label: 'Sales of unit',
        fill: false,
        tension: 0.1,
        borderColor: '#ffa1b5',
        backgroundColor: '#ffa1b5'
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  lineChartLegend = true;

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  @Input() pieChartLabels = [ 'Download Sales' , 'In Store Sales', 'Mail Sales' ];
  pieChartDatasets = [ {
    data: this.pieChartData,
    label: 'Customers'
  } ];
  pieChartLegend = true;
  pieChartPlugins = [];

  ngOnInit(): void {
    this.lineChartData.datasets[0].data = this.lineChartDataset
    this.pieChartDatasets[0].data = this.pieChartData
    
  }


}
