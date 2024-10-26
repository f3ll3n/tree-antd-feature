import React, { useState } from 'react';
import { TreeDataNode, TreeProps } from 'antd';
import { SearchAndAdd } from '../SearchAndAdd/SearchAndAdd';
import { DataNode } from 'antd/es/tree';
import { TreeView } from '../TreeView/TreeView';

const defaultData: DataNode[] = [
  {
    title: 'Все данные',
    key: '0-0',
    children: [
      {
        title: 'Что-то полезное',
        key: '0-0-0',
      },
      {
        title: '**Рофлы',
        key: '0-0-1',
      },
      {
        title: 'Всякие приколдесы',
        key: '0-0-2',
        children: [
          {
            title: 'Приколдесный рофл',
            key: '0-0-2-0',
          },
        ],
      },
    ],
  },
];
const filterTree = (data: DataNode[], search: string): DataNode[] => {
  return data
    .map((item) => {
      // Проверяем, есть ли совпадения с заголовком текущего узла
      const match = item.title.toLowerCase().includes(search.toLowerCase());
      const filteredChildren = item.children ? filterTree(item.children, search) : [];

      // Если текущий узел соответствует или у него есть соответствующие дочерние узлы
      if (match || filteredChildren.length > 0) {
        return {
          ...item,
          children: filteredChildren // Возвращаем только соответствующих детей
        };
      }

      return null; // Удаляем узел, если он не соответствует и у него нет соответствующих детей
    })
    .filter((item) => item !== null) as DataNode[]; // Фильтруем null
};






export const TreeContainer: React.FC = () => {
  const [gData, setGData] = useState(defaultData);
  const [searchTerm, setSearchTerm] = useState('');


  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); 

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddNode = (nodeTitle: string) => {
    setGData((prevData) => [
      ...prevData,
      {
        title: nodeTitle,
        key: `${prevData.length}-${Date.now()}`,
      },
    ]);
  };

  const filteredData = searchTerm ? filterTree(gData, searchTerm, '', []) : gData;

  return (
    <div>
      <SearchAndAdd onSearch={handleSearch} onAddNode={handleAddNode} />
      <TreeView treeData={filteredData} onDragEnter={onDragEnter} onDrop={onDrop} />
    </div>
  );
};
