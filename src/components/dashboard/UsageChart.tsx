import React, { useRef, useEffect } from 'react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

interface UsageChartProps {
  data: ChartData;
  title?: string;
  height?: number;
}

const UsageChart: React.FC<UsageChartProps> = ({ 
  data, 
  title = 'Water Usage', 
  height = 300 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    const graphBottom = canvas.height - padding;
    
    // Find max value for scaling
    const allValues = data.datasets.flatMap(ds => ds.data);
    const maxValue = Math.max(...allValues) * 1.1; // 10% padding at top
    
    // Draw title if provided
    if (title) {
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1F2937';
      ctx.fillText(title, canvas.width / 2, padding / 2);
    }
    
    // Draw Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, graphBottom);
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw X-axis
    ctx.beginPath();
    ctx.moveTo(padding, graphBottom);
    ctx.lineTo(canvas.width - padding, graphBottom);
    ctx.stroke();
    
    // Draw Y-axis labels and grid lines
    const yAxisSteps = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px Arial';
    ctx.fillStyle = '#6B7280';
    
    for (let i = 0; i <= yAxisSteps; i++) {
      const stepValue = (maxValue / yAxisSteps) * i;
      const yPos = graphBottom - (i * (chartHeight / yAxisSteps));
      
      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding, yPos);
      ctx.lineTo(canvas.width - padding, yPos);
      ctx.strokeStyle = i === 0 ? '#E5E7EB' : '#F3F4F6';
      ctx.stroke();
      
      // Label
      ctx.fillText(stepValue.toFixed(0), padding - 5, yPos + 3);
    }
    
    // Draw X-axis labels
    ctx.textAlign = 'center';
    ctx.font = '10px Arial';
    
    const barWidth = chartWidth / data.labels.length;
    
    data.labels.forEach((label, i) => {
      const xPos = padding + (i * barWidth) + (barWidth / 2);
      ctx.fillText(label, xPos, graphBottom + 15);
    });
    
    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      // Draw line
      ctx.beginPath();
      
      dataset.data.forEach((value, i) => {
        const xPos = padding + (i * barWidth) + (barWidth / 2);
        const yPos = graphBottom - (value / maxValue * chartHeight);
        
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      });
      
      ctx.strokeStyle = dataset.borderColor || '#3B82F6';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Fill area under line
      if (dataset.backgroundColor) {
        ctx.lineTo(padding + chartWidth, graphBottom);
        ctx.lineTo(padding, graphBottom);
        ctx.fillStyle = dataset.backgroundColor;
        ctx.fill();
      }
      
      // Draw data points
      dataset.data.forEach((value, i) => {
        const xPos = padding + (i * barWidth) + (barWidth / 2);
        const yPos = graphBottom - (value / maxValue * chartHeight);
        
        ctx.beginPath();
        ctx.arc(xPos, yPos, 4, 0, 2 * Math.PI);
        ctx.fillStyle = dataset.borderColor || '#3B82F6';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
      });
    });
    
    // Draw legend
    const legendX = padding;
    const legendY = padding - 15;
    const legendSpacing = 80;
    
    data.datasets.forEach((dataset, i) => {
      const xPos = legendX + (i * legendSpacing);
      
      // Legend color box
      ctx.fillStyle = dataset.borderColor || '#3B82F6';
      ctx.fillRect(xPos, legendY, 10, 10);
      
      // Legend label
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'left';
      ctx.font = '10px Arial';
      ctx.fillText(dataset.label, xPos + 15, legendY + 8);
    });
    
  }, [data, title]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <canvas 
        ref={canvasRef} 
        width={500}
        height={height}
        className="w-full"
      />
    </div>
  );
};

export default UsageChart;