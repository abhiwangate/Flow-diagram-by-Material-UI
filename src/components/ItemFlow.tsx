import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useItemStore } from '../store/itemStore';

const nodeStyles = {
  background: 'linear-gradient(45deg, #10B981, #059669)',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  fontSize: '14px',
  fontWeight: 500,
  width: 200,
  fontFamily: "'Outfit', sans-serif",
};

export const ItemFlow: React.FC = () => {
  const items = useItemStore((state) => state.items);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update nodes and edges when items change
  useEffect(() => {
    const newNodes: Node[] = items.map((item, index) => ({
      id: item.id,
      data: { 
        label: (
          <div>
            <div className="font-semibold mb-1">{item.title}</div>
            <div className="text-xs text-emerald-50">{item.description}</div>
          </div>
        )
      },
      position: { 
        x: 250 + Math.sin(index * 0.5) * 50, // Add some variation to x position
        y: index * 150 + 50 
      },
      type: 'default',
      style: {
        ...nodeStyles,
        animation: 'fadeIn 0.5s ease-out',
      },
    }));

    const newEdges: Edge[] = items.slice(1).map((item, index) => ({
      id: `e${index}`,
      source: items[index].id,
      target: item.id,
      animated: true,
      style: { 
        stroke: '#10B981', 
        strokeWidth: 3,
        opacity: 0.8,
      },
      type: 'smoothstep',
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [items, setNodes, setEdges]);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge({ 
      ...params, 
      type: 'smoothstep',
      animated: true,
      style: { 
        stroke: '#10B981', 
        strokeWidth: 3,
        opacity: 0.8,
      }
    }, eds));
  }, [setEdges]);

  return (
    <div style={{ height: 500 }} className="border border-emerald-100 rounded-lg overflow-hidden bg-emerald-50">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#10B981', strokeWidth: 3 },
          animated: true,
        }}
      >
        <Background color="#10B981" gap={16} size={1} />
        <Controls 
          className="bg-white border-emerald-100"
          style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        />
      </ReactFlow>
    </div>
  );
};