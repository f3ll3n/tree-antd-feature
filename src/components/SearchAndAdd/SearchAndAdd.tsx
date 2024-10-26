import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';

interface SearchAndAddProps {
  onSearch: (searchTerm: string) => void;
  onAddNode: (nodeTitle: string) => void;
}

export const SearchAndAdd: React.FC<SearchAndAddProps> = ({ onSearch, onAddNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleAddNode = () => {
    if (newNodeTitle) {
      onAddNode(newNodeTitle);
      setNewNodeTitle('');
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Input.Search
        placeholder="Поиск по дереву"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        Добавить узел
      </Button>

      <Modal
        title="Добавить новый узел"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddNode}
        okButtonProps={{ disabled: !newNodeTitle }}
      >
        <Input
          placeholder="Название нового узла"
          value={newNodeTitle}
          onChange={(e) => setNewNodeTitle(e.target.value)}
        />
      </Modal>
    </div>
  );
};
