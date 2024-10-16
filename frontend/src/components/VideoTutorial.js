import React, { useState } from 'react';
import styled from 'styled-components';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const TutorialContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 15px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const ControlButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const VideoTutorial = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const video = document.getElementById('tutorial-video');
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = document.getElementById('tutorial-video');
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  return (
    <TutorialContainer>
      <Title>P2P Lending Tutorial</Title>
      <VideoWrapper>
        <StyledVideo id="tutorial-video" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
      </VideoWrapper>
      <Controls>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </ControlButton>
        <ControlButton onClick={toggleMute}>
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </ControlButton>
      </Controls>
    </TutorialContainer>
  );
};

export default VideoTutorial;