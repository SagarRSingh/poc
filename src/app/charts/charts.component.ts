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


  @Input() set lineChartDataset(value:number[]){
    this.lineChartData =  {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May'
      ],
      datasets: [
        {
          data: value,
          label: 'Sales of unit',
          fill: false,
          tension: 0.1,
          borderColor: '#ffa1b5',
          backgroundColor: '#ffa1b5'
        }
      ]
    };
  }
  lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets:[]
  };
  
  lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  lineChartLegend = true;

  
  @Input() pieChartLabels:string[] = [ 'Download Sales' , 'In Store Sales', 'Mail Sales' ];
  @Input() set pieChartData(value:number[]){
    this.pieChartDatasets = [{
      data: value,
      label: 'Customers'
    }];
  }
  pieChartDatasets:any;

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  pieChartLegend = true;
  pieChartPlugins = [];

  ngOnInit(): void {
    // this.lineChartData.datasets[0].data = this.lineChartDataset
    
  }
}
