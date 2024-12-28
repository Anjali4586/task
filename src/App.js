import React, { useState } from "react";
import ReactFlow, { addEdge, applyNodeChanges, applyEdgeChanges, MiniMap, Controls } from "react-flow-renderer";
// import { v4 as uuidv4 } from "uuid";  
import Sidebar from "./Sidebar";  // Sidebar component for adding nodes and edges

const initialMetadata = {
  nodes: [
    { id: '1', type: 'input', position: { x: 250, y: 0 }, data: { label: 'Node 1' } },
    { id: '2', type: 'default', position: { x: 450, y: 100 }, data: { label: 'Node 2' } }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true }
  ]
};

function App() {
  const [elements, setElements] = useState([...initialMetadata.nodes, ...initialMetadata.edges]);

  // Handler for adding a new edge
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  // Handler for adding a new node
  const handleAddNode = (newNode) => {
    setElements((els) => [...els, newNode]);
  };

  // Handler for adding a new edge from the sidebar
  const handleAddEdge = (newEdge) => {
    setElements((els) => [...els, newEdge]);
  };

  // Handler for removing elements (nodes or edges)
  const onElementsRemove = (elementsToRemove) => {
    // Apply node changes
    const updatedNodes = applyNodeChanges(elementsToRemove, elements);
    // Apply edge changes
    const updatedEdges = applyEdgeChanges(elementsToRemove, updatedNodes);
    // Set the updated elements (both nodes and edges)
    setElements(updatedEdges);
  };

  return (
    <div className="App" style={{ height: "100vh", display: "flex" }}>
      <Sidebar onAddNode={handleAddNode} onAddEdge={handleAddEdge} nodeIds={elements.map(el => el.id)} />
      <div style={{ flex: 1, height: "100%" }}>
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          snapToGrid={true}
          style={{ width: "100%", height: "100%" }}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
