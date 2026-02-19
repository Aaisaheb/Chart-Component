import { Component } from '@angular/core';
import { ChartOptions } from './chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Line Chart Example
  lineChartOptions: ChartOptions = {
    type: 'line',
    title: 'Sales Report',
    series: [
      { name: 'Offline', value: 35, color: '#ef4444' },
      { name: 'Online', value: 70, color: '#3b82f6' },
      { name: 'Mobile', value: 45, color: '#10b981' },
      { name: 'Store', value: 55, color: '#f59e0b' },
      { name: 'Catalog', value: 25, color: '#8b5cf6' }
    ]
  };

  // Column Chart Example
  columnChartOptions: ChartOptions = {
    type: 'column',
    title: 'Monthly Revenue',
    series: [
      { name: 'Jan', value: 120, color: '#3b82f6' },
      { name: 'Feb', value: 150, color: '#3b82f6' },
      { name: 'Mar', value: 180, color: '#3b82f6' },
      { name: 'Apr', value: 140, color: '#3b82f6' },
      { name: 'May', value: 200, color: '#3b82f6' },
      { name: 'Jun', value: 220, color: '#3b82f6' }
    ]
  };

  // Pie Chart Example
  pieChartOptions: ChartOptions = {
    type: 'pie',
    title: 'Market Share Distribution',
    series: [
      { name: 'Product A', value: 35, color: '#ef4444' },
      { name: 'Product B', value: 25, color: '#3b82f6' },
      { name: 'Product C', value: 20, color: '#10b981' },
      { name: 'Product D', value: 15, color: '#f59e0b' },
      { name: 'Product E', value: 5, color: '#8b5cf6' }
    ]
  };

  // Additional examples
  quarterlyChartOptions: ChartOptions = {
    type: 'column',
    title: 'Quarterly Performance',
    series: [
      { name: 'Q1', value: 450, color: '#10b981' },
      { name: 'Q2', value: 520, color: '#3b82f6' },
      { name: 'Q3', value: 480, color: '#f59e0b' },
      { name: 'Q4', value: 600, color: '#ef4444' }
    ]
  };

  expenseChartOptions: ChartOptions = {
    type: 'pie',
    title: 'Expense Breakdown',
    series: [
      { name: 'Salaries', value: 40, color: '#3b82f6' },
      { name: 'Marketing', value: 25, color: '#10b981' },
      { name: 'Operations', value: 20, color: '#f59e0b' },
      { name: 'R&D', value: 15, color: '#8b5cf6' }
    ]
  };

  growthChartOptions: ChartOptions = {
    type: 'line',
    title: 'Year-over-Year Growth',
    series: [
      { name: '2019', value: 100, color: '#3b82f6' },
      { name: '2020', value: 115, color: '#3b82f6' },
      { name: '2021', value: 130, color: '#3b82f6' },
      { name: '2022', value: 145, color: '#3b82f6' },
      { name: '2023', value: 160, color: '#3b82f6' },
      { name: '2024', value: 180, color: '#3b82f6' }
    ]
  };
}
