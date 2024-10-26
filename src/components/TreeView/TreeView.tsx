import React from 'react';
import { Tree as TreeAntd } from 'antd';
import type { TreeDataNode } from 'antd';

interface TreeViewProps {
  treeData: TreeDataNode[];
}

export const TreeView: React.FC<TreeViewProps> = ({ treeData, onDragEnter, onDrop }) => {
    
  return (
    <TreeAntd
        draggable
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={treeData}
        defaultExpandAll
    />
  );
};
