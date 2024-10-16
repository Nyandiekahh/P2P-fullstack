import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Georgia', serif;
`;

const TimeDisplay = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const DateDisplay = styled.div`
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 5px;
`;

const ClassicClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <ClockContainer>
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
      <DateDisplay>{formatDate(time)}</DateDisplay>
    </ClockContainer>
  );
};

export default ClassicClock;