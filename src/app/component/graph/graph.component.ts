import { Component, OnInit } from '@angular/core';
import { IChartistData, IBarChartOptions, IChartistAnimationOptions } from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { Checkout } from '../../model/checkout';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  checkoutStatistics: Checkout[] = []; 

  timeOptions: TimeOption[] = [
    {
      name: 'All',
      selected: false
    },
    {
      name: 'Year',
      selected: false
    },
    {
      name: 'Month',
      selected: true
    },
    {
      name: 'Day',
      selected: false
    }
  ];
  timeOptionToLabels = {
    'Day': ['12am', '12pm', '11:59pm'],
    'Month': this.generateMonthLabels(),
    'Year': this.generateYearLabels(),
    'All': this.generateAllLabels()
  };

  /*
https://github.com/willsoto/ng-chartist/tree/master/projects/ng-chartist-demo/src/app/components
  */
  type: ChartType = 'Line';
  data: IChartistData = {
    labels: this.timeOptionToLabels[this.timeOptions.find(opt => opt.selected).name],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  };
 
  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    horizontalBars: true,
    classNames: {
      label: "gray-fg"

    },
    height: "66vh",
    width: "100%"
  };
 
  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };
  

  constructor() { }

  ngOnInit(): void {
  }

  onTimeOptionSelected(selectedOption: TimeOption): void {
    this.timeOptions.forEach(option => {
      if(option.name === selectedOption.name) {
        option.selected = true;
      }
      else {
        option.selected = false;
      }
    });
    this.data.labels = this.timeOptionToLabels[selectedOption.name];
    this.data.series = [this.generateRandomTestData((this.data.labels.length)), this.generateRandomTestData((this.data.labels.length))];
    // fill in data series with data from back end

    this.data = { ...this.data };
  }

  generateRandomTestData(length: number): number[] {
    const arr = [];
    for(let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 10));
    }
    return arr;
  }


  generateAllLabels(): string[] {

    return ['2017', '2018', '2019', '2020', '2021'];
  }

  generateYearLabels(): string[] {

    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  generateMonthLabels(): string[] {

    const arr = [];
    for(let i = 1; i <= 31; i++) {
      arr.push(String(i));
    }
    return arr;
  }


}

interface TimeOption {
  name: string;
  selected: boolean;
}