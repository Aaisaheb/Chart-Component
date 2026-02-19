import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface ChartOptions {
  type: 'line' | 'column' | 'pie';
  title: string;
  series: { name: string; value: number; color: string; }[];
}

@Component({
  selector: 'io-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() chartOptions!: ChartOptions;

  // Chart dimensions
  width = 600;
  height = 400;
  padding = 60;
  chartWidth = this.width - (this.padding * 2);
  chartHeight = this.height - (this.padding * 2);

  // Calculated values for rendering
  maxValue = 0;
  normalizedData: Array<{ name: string; value: number; color: string; normalizedValue: number; percentage: number }> = [];
  
  // Line chart specific
  linePoints: string = '';
  
  // Column chart specific
  columnWidth = 0;
  columnSpacing = 10;
  
  // Pie chart specific
  pieCenterX = this.width / 2;
  pieCenterY = this.height / 2;
  pieRadius = Math.min(this.chartWidth, this.chartHeight) / 2 - 20;
  piePaths: Array<{ path: string; color: string; name: string; percentage: number; value: number; startAngle: number; endAngle: number }> = [];
  
  // Grid lines helper
  gridLines = [0, 1, 2, 3, 4];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartOptions'] && this.chartOptions) {
      this.processData();
      this.renderChart();
    }
  }

  private processData(): void {
    if (!this.chartOptions?.series || this.chartOptions.series.length === 0) {
      return;
    }

    // Find max value for normalization
    this.maxValue = Math.max(...this.chartOptions.series.map(s => s.value), 0);
    
    // Calculate total for pie chart percentages
    const total = this.chartOptions.series.reduce((sum, s) => sum + s.value, 0);

    // Normalize data
    this.normalizedData = this.chartOptions.series.map(s => ({
      name: s.name,
      value: s.value,
      color: s.color,
      normalizedValue: this.maxValue > 0 ? (s.value / this.maxValue) : 0,
      percentage: total > 0 ? (s.value / total) * 100 : 0
    }));
  }

  private renderChart(): void {
    switch (this.chartOptions.type) {
      case 'line':
        this.renderLineChart();
        break;
      case 'column':
        this.renderColumnChart();
        break;
      case 'pie':
        this.renderPieChart();
        break;
    }
  }

  private renderLineChart(): void {
    if (this.normalizedData.length === 0) return;

    const points: string[] = [];
    const stepX = this.chartWidth / Math.max(1, this.normalizedData.length - 1);
    
    this.normalizedData.forEach((item, index) => {
      const x = this.padding + (index * stepX);
      const y = this.padding + this.chartHeight - (item.normalizedValue * this.chartHeight);
      points.push(`${x},${y}`);
    });

    this.linePoints = points.join(' ');
  }

  private renderColumnChart(): void {
    if (this.normalizedData.length === 0) return;

    const availableWidth = this.chartWidth - (this.columnSpacing * (this.normalizedData.length - 1));
    this.columnWidth = availableWidth / this.normalizedData.length;
  }

  private renderPieChart(): void {
    if (this.normalizedData.length === 0) return;

    let currentAngle = -90; // Start from top
    this.piePaths = [];

    this.normalizedData.forEach(item => {
      const angle = (item.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const path = this.createPieSlicePath(
        this.pieCenterX,
        this.pieCenterY,
        this.pieRadius,
        startAngle,
        endAngle
      );

      this.piePaths.push({
        path,
        color: item.color,
        name: item.name,
        percentage: item.percentage,
        value: item.value,
        startAngle,
        endAngle
      });

      currentAngle = endAngle;
    });
  }

  private createPieSlicePath(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(centerX, centerY, radius, endAngle);
    const end = this.polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', centerX, centerY,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number } {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  // Helper methods for template
  getLineX(index: number): number {
    if (this.normalizedData.length <= 1) return this.padding;
    const stepX = this.chartWidth / Math.max(1, this.normalizedData.length - 1);
    return this.padding + (index * stepX);
  }

  getLineY(index: number): number {
    return this.padding + this.chartHeight - (this.normalizedData[index].normalizedValue * this.chartHeight);
  }

  getColumnX(index: number): number {
    return this.padding + (index * (this.columnWidth + this.columnSpacing));
  }

  getColumnY(index: number): number {
    return this.padding + this.chartHeight - (this.normalizedData[index].normalizedValue * this.chartHeight);
  }

  getColumnHeight(index: number): number {
    return this.normalizedData[index].normalizedValue * this.chartHeight;
  }

  getPieLabelX(index: number): number {
    const item = this.piePaths[index];
    if (!item) return 0;
    const midAngle = (item.startAngle + item.endAngle) / 2;
    const labelRadius = this.pieRadius * 0.7;
    return this.pieCenterX + (labelRadius * Math.cos((midAngle - 90) * Math.PI / 180));
  }

  getPieLabelY(index: number): number {
    const item = this.piePaths[index];
    if (!item) return 0;
    const midAngle = (item.startAngle + item.endAngle) / 2;
    const labelRadius = this.pieRadius * 0.7;
    return this.pieCenterY + (labelRadius * Math.sin((midAngle - 90) * Math.PI / 180));
  }
}
