import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";  // For generating unique IDs

function Sidebar({ onAddNode, onAddEdge, nodeIds }) {
  const [nodeLabel, setNodeLabel] = useState('');
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddNode = () => {
    if (!nodeLabel) {
      setErrorMessage('Node label is required.');
      return;
    }
    const newNode = {
      id: uuidv4(),
      type: 'default',
      position: { x: 250, y: 250 },
      data: { label: nodeLabel },
    };
    onAddNode(newNode);
    setNodeLabel('');
    setErrorMessage('');
  };

  const handleAddEdge = () => {
    if (!edgeSource || !edgeTarget) {
      setErrorMessage('Both source and target node IDs are required.');
      return;
    }
    if (!nodeIds.includes(edgeSource) || !nodeIds.includes(edgeTarget)) {
      setErrorMessage('Invalid source or target node ID.');
      return;
    }
    const newEdge = {
      id: uuidv4(),
      source: edgeSource,
      target: edgeTarget,
      animated: true,
    };
    onAddEdge(newEdge);
    setEdgeSource('');
    setEdgeTarget('');
    setErrorMessage('');
  };

  return (
    <div className="sidebar">
      <h3>Add Node</h3>
      <input
        type="text"
        placeholder="Node Label"
        value={nodeLabel}
        onChange={(e) => setNodeLabel(e.target.value)}
      />
      <button onClick={handleAddNode}>Add Node</button>

      <h3>Add Edge</h3>
      <input
        type="text"
        placeholder="Source Node ID"
        value={edgeSource}
        onChange={(e) => setEdgeSource(e.target.value)}
      />
      <input
        type="text"
        placeholder="Target Node ID"
        value={edgeTarget}
        onChange={(e) => setEdgeTarget(e.target.value)}
      />
      <button onClick={handleAddEdge}>Add Edge</button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Sidebar;
