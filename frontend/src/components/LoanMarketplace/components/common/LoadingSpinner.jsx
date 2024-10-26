import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Spinner = styled(motion.div)`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 40px auto;
`;

const LoadingSpinner = () => {
  return (
    <Spinner
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export default LoadingSpinner;