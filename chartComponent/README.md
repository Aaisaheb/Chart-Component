# Custom Angular Chart Component

A reusable Angular chart component that renders different chart types (Line, Column, Pie) based on configuration input. Built with pure Angular, TypeScript, and SVG - no external chart libraries required.

## Features

- ✅ **Three Chart Types**: Line, Column, and Pie charts
- ✅ **Fully Customizable**: Configure colors, values, and labels through input
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Interactive**: Hover effects on chart elements
- ✅ **Legend**: Automatic legend generation
- ✅ **Animations**: Smooth transitions and fade-in effects
- ✅ **No Dependencies**: Pure Angular implementation using SVG

## Project Structure

```
src/
├── app/
│   ├── chart/
│   │   ├── chart.component.ts      # Component logic
│   │   ├── chart.component.html    # SVG template
│   │   └── chart.component.scss    # Styling
│   ├── app.component.ts            # Demo component
│   ├── app.component.html          # Demo template
│   ├── app.component.scss          # Demo styles
│   └── app.module.ts               # App module
├── styles.scss                     # Global styles
└── main.ts                         # Bootstrap
```

## ChartOptions Interface

```typescript
interface ChartOptions {
  type: 'line' | 'column' | 'pie';
  title: string;
  series: { name: string; value: number; color: string; }[];
}
```

## Usage

### Basic Example

```typescript
import { ChartOptions } from './chart/chart.component';

export class MyComponent {
  chartOptions: ChartOptions = {
    type: 'line',
    title: 'Sales Report',
    series: [
      { name: 'Offline', value: 30, color: 'red' },
      { name: 'Online', value: 70, color: 'blue' }
    ]
  };
}
```

```html
<io-chart [chartOptions]="chartOptions"></io-chart>
```

### Line Chart

```typescript
lineChartOptions: ChartOptions = {
  type: 'line',
  title: 'Sales Trend',
  series: [
    { name: 'Jan', value: 100, color: '#3b82f6' },
    { name: 'Feb', value: 120, color: '#3b82f6' },
    { name: 'Mar', value: 140, color: '#3b82f6' }
  ]
};
```

### Column Chart

```typescript
columnChartOptions: ChartOptions = {
  type: 'column',
  title: 'Monthly Revenue',
  series: [
    { name: 'Q1', value: 450, color: '#10b981' },
    { name: 'Q2', value: 520, color: '#3b82f6' },
    { name: 'Q3', value: 480, color: '#f59e0b' }
  ]
};
```

### Pie Chart

```typescript
pieChartOptions: ChartOptions = {
  type: 'pie',
  title: 'Market Share',
  series: [
    { name: 'Product A', value: 35, color: '#ef4444' },
    { name: 'Product B', value: 25, color: '#3b82f6' },
    { name: 'Product C', value: 20, color: '#10b981' }
  ]
};
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`

3. **Build for Production**
   ```bash
   npm run build
   ```

## Implementation Details

### Chart Rendering

- **Line Chart**: Uses SVG `<polyline>` with connected data points
- **Column Chart**: Uses SVG `<rect>` elements for vertical bars
- **Pie Chart**: Uses SVG `<path>` elements with arc calculations

### Features Implemented

1. **Responsive Design**
   - Charts adapt to container width
   - Mobile-friendly layouts
   - Flexible grid system

2. **Hover Effects**
   - Data points scale on hover (line chart)
   - Columns highlight on hover
   - Pie slices scale and brighten on hover
   - Tooltips show detailed information

3. **Legend**
   - Automatically generated from series data
   - Color-coded indicators
   - Interactive hover states

4. **Animations**
   - Fade-in effects for grid lines
   - Smooth transitions on hover
   - Transform animations

5. **Edge Cases Handled**
   - Empty data sets
   - Zero values
   - Single data point
   - Large datasets

## Technical Requirements Met

✅ **Angular Usage**: Proper component structure, Input decorators, lifecycle hooks  
✅ **Chart Logic**: Accurate calculations for all chart types  
✅ **Reusability**: Single component handles all chart types via configuration  
✅ **UI/CSS**: Clean, modern design with responsive layout  
✅ **Code Quality**: TypeScript interfaces, proper naming, error handling  
✅ **Documentation**: Comprehensive README and inline comments  

## Screenshots

To capture screenshots of the charts:

1. Run the application: `npm start`
2. Open `http://localhost:4200/` in your browser
3. Take screenshots of each chart type:
   - Line Chart
   - Column Chart
   - Pie Chart
4. Save screenshots in a `screenshots/` folder

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes as part of an Angular assignment.

## Author

Built as a custom Angular chart component implementation without external libraries.
