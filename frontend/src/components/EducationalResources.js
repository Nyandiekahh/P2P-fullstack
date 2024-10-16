import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const ResourcesContainer = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #333;
`;

const ResourceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ResourceItem = styled(motion.li)`
  background-color: #f0f4f8;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const ResourceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
`;

const ResourceTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const ResourceContent = styled(motion.div)`
  padding: 0 15px 15px;
`;

const resourcesData = [
  {
    id: 1,
    title: 'What is P2P Lending?',
    content: 'P2P lending, or peer-to-peer lending, is a method of debt financing that enables individuals to borrow and lend money without the use of an official financial institution as an intermediary. It removes the middleman from the process, but it also comes with more risk and potential returns for investors.',
  },
  {
    id: 2,
    title: 'Benefits of P2P Lending',
    content: 'P2P lending offers several benefits, including potentially higher returns for investors, lower interest rates for borrowers, quick and easy online applications, and the ability to diversify investments across multiple loans.',
  },
  {
    id: 3,
    title: 'Risks Involved in P2P Lending',
    content: 'While P2P lending can be profitable, it is important to understand the risks. These include the risk of default by borrowers, lack of liquidity, and potential platform risks. It is crucial to do thorough research and only invest money you can afford to lose.',
  },
  {
    id: 4,
    title: 'How to Get Started with P2P Lending',
    content: 'To get started with P2P lending, first research and choose a reputable platform. Create an account, verify your identity, and fund your account. Then, you can start investing in loans or apply for a loan yourself. Remember to start small and diversify your investments.',
  },
  {
    id: 5,
    title: 'Tips for Successful P2P Lending',
    content: 'To succeed in P2P lending, diversify your investments across multiple loans, understand the risk grades, reinvest your returns, keep an eye on platform performance, and stay informed about market trends and economic factors that could affect loan performance.',
  },
];

const EducationalResources = () => {
  const [expandedResource, setExpandedResource] = useState(null);

  const toggleResource = (id) => {
    setExpandedResource(expandedResource === id ? null : id);
  };

  return (
    <ResourcesContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>
        <BookOpen size={24} style={{ marginRight: '10px' }} />
        Educational Resources
      </Title>

      <ResourceList>
        <AnimatePresence>
          {resourcesData.map((resource) => (
            <ResourceItem key={resource.id}>
              <ResourceHeader onClick={() => toggleResource(resource.id)}>
                <ResourceTitle>{resource.title}</ResourceTitle>
                {expandedResource === resource.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </ResourceHeader>
              <AnimatePresence>
                {expandedResource === resource.id && (
                  <ResourceContent
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{resource.content}</p>
                  </ResourceContent>
                )}
              </AnimatePresence>
            </ResourceItem>
          ))}
        </AnimatePresence>
      </ResourceList>
    </ResourcesContainer>
  );
};

export default EducationalResources;