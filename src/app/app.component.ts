import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './request.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet, FormsModule, ChartsComponent, FilterPipe],
  providers: [RequestService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name='';
  startDate='';
  endTime= '';
  showDropdown=false;
  showList = false;

  list=[{
    nodeId: null,
    name: null,
    status: null
  }];
  enterprises = [{customers:1, name: ''}]
  // list = null

  /*enterprises = [
    
    {
      name: 'Name one',
      enterpriseId: 'EN1',
      customers: 150,
      startDate: '2022-11-17',
      endTime: '12:26',
      nodes: [
        {
          nodeId: "EN1001",
          name: "node 1",
          status: 'active'
        },
        {
          nodeId: "EN1002",
          name: "node 2",
          status: 'pending'
        },
        {
          nodeId: "EN1003",
          name: "node 3",
          status: 'down'
        },
      ]
    },
    {
      name: 'Name two',
      enterpriseId: 'EN2',
      customers: 180,
      startDate: '2023-01-17',
      endTime: '12:00',
      nodes: [
        {
          nodeId: "EN2001",
          name: "node 1",
          status: 'active'
        },
        {
          nodeId: "EN2002",
          name: "node 2",
          status: 'pending'
        },
        {
          nodeId: "EN2003",
          name: "node 3",
          status: 'down'
        },
      ]
    },
    {
      name: 'Name three',
      enterpriseId: 'EN3',
      customers: 200,
      startDate: '2022-01-17',
      endTime: '11:26',
      nodes: [
        {
          nodeId: "EN3001",
          name: "node 1",
          status: 'active'
        },
        {
          nodeId: "EN3002",
          name: "node 2",
          status: 'pending'
        },
        {
          nodeId: "EN3003",
          name: "node 3",
          status: 'down'
        },
      ]
    },
    {
      name: 'Name four',
      enterpriseId: 'EN4',
      customers: 100,
      startDate: '2023-02-17',
      endTime: '12:26',
      nodes: [
        {
          nodeId: "EN4001",
          name: "node 1",
          status: 'active'
        },
        {
          nodeId: "EN4002",
          name: "node 2",
          status: 'pending'
        },
        {
          nodeId: "EN4003",
          name: "node 3",
          status: 'down'
        },
      ]
    },
    {
      name: 'Name five',
      enterpriseId: 'EN5',
      customers: 120,
      startDate: '2021-11-17',
      endTime: '11:00',
      nodes: [
        {
          nodeId: "EN5001",
          name: "node 1",
          status: 'active'
        },
        {
          nodeId: "EN5002",
          name: "node 2",
          status: 'pending'
        },
        {
          nodeId: "EN5003",
          name: "node 3",
          status: 'down'
        },
      ]
    },
    
  ]*/
  
  pieChartData: number[]=[];
  lineChartData: number[] = [];
  pieChartLabel: string[] = [];

  @ViewChild('searchDropdown') searchWrapper!:ElementRef<HTMLElement> 

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement:HTMLElement){
    if (!targetElement) {
      return;
    }
    const clickedInside = this.searchWrapper.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.showDropdown = false;
    } 
  }

  constructor(private requestService:RequestService){
    this.requestService.request('/enterprises').subscribe(data=>{
      this.enterprises = data   
      this.pieChartData = this.enterprises.map(e=>e.customers);
      this.pieChartLabel = this.enterprises.map(e=>e.name)
      this.lineChartData = this.pieChartData;   
    });
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }
  setDropdown(value:boolean){
    this.showDropdown = value;
  }

  setList(enterprise:any){
    this.showList = true;
    this.list = enterprise.nodes;
    this.name = enterprise.name;
    this.showDropdown = false;
  }
  
  filterStartDate(){
    this.requestService.request(`/nodes?startDate=${this.startDate}`).subscribe(nodes=>{
      if(nodes.length > 0){
        this.list = nodes;
        this.showList = true;
      }
    });
    
  }
  filterEndDate(){
    this.requestService.request(`/nodes?endTime=${this.endTime}`).subscribe(nodes=>{
      if(nodes.length > 0){
        this.list = nodes;
        this.showList = true;
      }
    });
  }



}

