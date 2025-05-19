import React, { useRef, useEffect } from 'react';
import { MapNode } from '../../types';

interface SystemMapProps {
  nodes: MapNode[];
  width?: number;
  height?: number;
}

const SystemMap: React.FC<SystemMapProps> = ({ 
  nodes, 
  width = 600, 
  height = 400 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Render the map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections first (so they're behind nodes)
    nodes.forEach(node => {
      node.linkedTo.forEach(targetId => {
        const targetNode = nodes.find(n => n.id === targetId);
        if (targetNode) {
          drawConnection(ctx, node, targetNode);
        }
      });
    });
    
    // Draw nodes
    nodes.forEach(node => {
      drawNode(ctx, node);
    });
    
  }, [nodes, width, height]);
  
  // Draw a connection between nodes
  const drawConnection = (
    ctx: CanvasRenderingContext2D, 
    sourceNode: MapNode, 
    targetNode: MapNode
  ) => {
    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    
    // Set connection style based on node status
    if (sourceNode.status === 'warning' || targetNode.status === 'warning') {
      ctx.strokeStyle = '#FCD34D'; // Yellow
      ctx.lineWidth = 3;
    } else if (sourceNode.status === 'error' || targetNode.status === 'error') {
      ctx.strokeStyle = '#EF4444'; // Red
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = '#94A3B8'; // Gray
      ctx.lineWidth = 2;
    }
    
    ctx.stroke();
  };
  
  // Draw a node
  const drawNode = (ctx: CanvasRenderingContext2D, node: MapNode) => {
    const radius = node.type === 'tank' ? 16 : 12;
    
    // Set fill color based on status
    let fillColor = '#3B82F6'; // Default blue
    
    if (node.status === 'warning') {
      fillColor = '#FBBF24'; // Yellow
    } else if (node.status === 'error') {
      fillColor = '#EF4444'; // Red
    } else {
      // Different colors for different node types
      switch (node.type) {
        case 'sensor':
          fillColor = '#0891B2'; // Cyan
          break;
        case 'device':
          fillColor = '#8B5CF6'; // Purple
          break;
        case 'junction':
          fillColor = '#94A3B8'; // Gray
          break;
        case 'tank':
          fillColor = '#0D9488'; // Teal
          break;
      }
    }
    
    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Draw border
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    
    // Draw icon or text based on node type
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let icon = '';
    
    switch (node.type) {
      case 'sensor':
        icon = 'S';
        break;
      case 'device':
        icon = 'D';
        break;
      case 'junction':
        icon = 'J';
        break;
      case 'tank':
        icon = 'T';
        break;
    }
    
    ctx.fillText(icon, node.x, node.y);
    
    // Add label below node
    if (node.data) {
      ctx.font = '9px Arial';
      ctx.fillStyle = '#374151';
      ctx.fillText(
        'data' in node.data && 'name' in node.data ? node.data.name : node.type, 
        node.x, 
        node.y + radius + 12
      );
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
      <h3 className="text-lg font-medium mb-4">System Map</h3>
      <div className="border rounded-lg overflow-auto">
        <canvas 
          ref={canvasRef} 
          width={width} 
          height={height}
          className="min-w-full"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 rounded-full bg-cyan-600 mr-2"></div>
          <span>Sensor</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
          <span>Device</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
          <span>Junction</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 rounded-full bg-teal-600 mr-2"></div>
          <span>Tank</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <span>Warning</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span>Error</span>
        </div>
      </div>
    </div>
  );
};

export default SystemMap;