import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild('daily') daily: ElementRef;
  @ViewChild('weekly') weekly: ElementRef;
  @ViewChild('monthly') monthly: ElementRef;

  contentWalk;
  contentRun;
  contentBike;

  dataDaily = {
    datasets: [{
      data: [2, 3],
      backgroundColor: [
        '#3c8a1f',
        '#bcbacf',
      ]
    },
  ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Ukończony treing',
      'Pozostały trening',
    ],
  };

  dataWeekly = {
    datasets: [{
      data: [15, 21],
      backgroundColor: [
        '#3f2722',
        '#bcbacf',
      ]
    },
  ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Ukończony treing',
      'Pozostały trening',
    ],
  };

  dataMonthly = {
    datasets: [{
      data: [30, 84],
      backgroundColor: [
        '#3c1a8f',
        '#bcbacf',
      ]
    },
  ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Ukończony treing',
      'Pozostały trening',
    ],
  };

  chart = [];

  constructor(private dataService: DataService, private loginService: LoginService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataService.getRunHistory().subscribe(data => {
      //console.log(data[0]);
      //this.content = data[0].contentstring;
      this.contentRun = data;
    });

    this.dataService.getWalkHistory().subscribe(data => {
      //console.log(data[0]);
      //this.content = data[0].contentstring;
      this.contentWalk = data;
    });

    this.dataService.getBikeHistory().subscribe(data => {
      //console.log(data[0]);
      //this.content = data[0].contentstring;
      this.contentBike = data;
    });
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.daily.nativeElement.getContext('2d'), {
      theme: 'light2',
      animationEnabled: true,
      type: 'pie',
      data: this.dataDaily,
      options: {
        legend: {
          display: true,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        title: {
          text: 'Monthly Expense'
        },
      }
    });

    this.chart = new Chart(this.weekly.nativeElement.getContext('2d'), {
      theme: 'light2',
      animationEnabled: true,
      type: 'pie',
      data: this.dataWeekly,
      options: {
        legend: {
          display: true,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        title: {
          text: 'Monthly Expense'
        },
      }
    });

    this.chart = new Chart(this.monthly.nativeElement.getContext('2d'), {
      theme: 'light2',
      animationEnabled: true,
      type: 'pie',
      data: this.dataMonthly,
      options: {
        legend: {
          display: true,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        title: {
          text: 'Monthly Expense'
        },
      }
    });

  }

  logout() {
    this.loginService.logout();
  }
}
