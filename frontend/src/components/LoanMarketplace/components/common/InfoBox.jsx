import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background-color: ${props => {
    switch (props.type) {
      case 'warning':
        return '#fff3e0';
      case 'success':
        return '#e8f5e9';
      case 'error':
        return '#ffebee';
      default:
        return '#e3f2fd';
    }
  }};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 16px 0;
`;

const Content = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 4px 0;
    color: #1a1a1a;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const InfoBox = ({ type = 'info', icon, title, children }) => {
  return (
    <Box type={type}>
      {icon}
      <Content>
        {title && <h4>{title}</h4>}
        {children}
      </Content>
    </Box>
  );
};

export default InfoBox;