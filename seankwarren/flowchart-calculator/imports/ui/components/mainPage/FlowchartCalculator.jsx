import React, { useEffect } from 'react';

import 'reactflow/dist/style.css';
import 'split-pane-react/esm/themes/default.css';

import FlowchartCanvas from './FlowchartCanvas';
import JSONViewer from './JSONViewer';
import NodeButtons from './NodeButtons';
import useLocalFlowData from '../../hooks/useLocalFlowData';
import useRemoteFlowData from '../../hooks/useRemoteFlowData';
import useDraggable from '../../hooks/useDraggable';
import useToggleable from '../../hooks/useToggleable';
import DarkModeSwitch from '../reusable/DarkModeSwitch';
import ResizablePane from '../reusable/ResizablePane';
import startingNode from '../../utils/startingNode';

const FlowchartCalculator = () => {
    // state for nodes and edges
    const {
        reactFlowInstance,
        updateReactFlowInstance,
        clearFlowchart,
        loadFlowchart,
        nodes,
        onNodesChange,
        addNode,
        edges,
        onEdgesChange,
        handleConnect,
        updateOutputNodes,
    } = useLocalFlowData({ nodes: [startingNode] });

    // state for flows on db
    const {
        fetchedFlows,
        saveFlow,
        fetchFlows,
        clearFlows,
        flowName,
        updateFlowName,
    } = useRemoteFlowData(nodes, edges);

    // Drag and drop handling
    const { handleDragStart, handleDragOver, handleDrop } = useDraggable(
        reactFlowInstance,
        addNode
    );

    // Dark mode toggling
    const { isDarkMode, toggleDarkMode } = useToggleable(true);

    useEffect(() => {
        fetchFlows();
    }, []);

    return (
        <ResizablePane>
            <div
                className='flowchart-container'
                style={{ height: '100vh', width: '100%' }}
            >
                <NodeButtons
                    handleDragStart={handleDragStart}
                    clearFlows={clearFlows}
                    clearFlowchart={clearFlowchart}
                    isDarkMode={isDarkMode}
                />
                <FlowchartCanvas
                    setReactFlowInstance={updateReactFlowInstance}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    addNode={addNode}
                    handleConnect={handleConnect}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    updateOutputNodes={updateOutputNodes}
                    isDarkMode={isDarkMode}
                />
            </div>
            <JSONViewer
                nodes={nodes}
                edges={edges}
                flows={fetchedFlows}
                loadFlowchart={loadFlowchart}
                onSave={saveFlow}
                flowName={flowName}
                updateFlowName={updateFlowName}
                isDarkMode={isDarkMode}
            >
                <DarkModeSwitch
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />
            </JSONViewer>
        </ResizablePane>
    );
};

export default FlowchartCalculator;
