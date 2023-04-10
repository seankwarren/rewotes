import React from 'react';
import DraggableButton from './DraggableButton';

const NodeButtons = ({ addNode, handleDragStart, isDarkMode }) => {
    // Darkmode style toggling
    const buttonsPanelStyle = {
        backgroundColor: isDarkMode
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(51, 51, 51, 0.3)',
    };

    return (
        <div className='buttons-panel' style={{ ...buttonsPanelStyle, width: '100%' }}>
            <DraggableButton label="in" nodeType="input" onDragStart={handleDragStart} />
            <DraggableButton label="+" nodeType="binary" onDragStart={handleDragStart} />
            <DraggableButton label="sin" nodeType="unary" onDragStart={handleDragStart} />
            <DraggableButton label="&gt;" nodeType="comparison" onDragStart={handleDragStart} />
            <DraggableButton label="out" nodeType="output" onDragStart={handleDragStart} />
        </div>
    );
};

export default NodeButtons;
