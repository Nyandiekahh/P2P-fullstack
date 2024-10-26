import React from 'react';
import styled from 'styled-components';
import { FileText, Download } from 'lucide-react';

const Box = styled.div`
  padding: 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    border-color: #4CAF50;
  }
`;

const DocumentBox = ({ name, onClick }) => {
  return (
    <Box onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <FileText size={20} />
        <span>{name}</span>
      </div>
      <Download size={20} />
    </Box>
  );
};

export default DocumentBox;