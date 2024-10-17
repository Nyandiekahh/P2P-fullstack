import React, { useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const TutorialComponent = () => {
  const [runTutorial, setRunTutorial] = useState(true);

  const steps = [
    {
      target: '.user-profile',
      content: 'This is your user profile. You can view and edit your personal information here.',
      placement: 'bottom',
    },
    {
      target: '.quick-stats',
      content: 'Here you can see a quick overview of your account statistics.',
      placement: 'bottom',
    },
    {
      target: '.notifications',
      content: 'You\'ll receive important notifications about your account and investments here.',
      placement: 'left',
    },
    {
      target: '.loan-activity',
      content: 'This chart shows your loan activity over time.',
      placement: 'top',
    },
    {
      target: '.video-tutorial',
      content: 'Watch this video tutorial to learn more about P2P lending.',
      placement: 'bottom',
    },
    {
      target: '.loan-listings',
      content: 'Browse available loan requests and invest in them here.',
      placement: 'right',
    },
    {
      target: '.transaction-history',
      content: 'View your recent transactions and account activity here.',
      placement: 'left',
    },
    {
      target: '.currency-converter',
      content: 'Use this tool to convert between different currencies.',
      placement: 'left',
    },
    {
      target: '.educational-resources',
      content: 'Learn more about P2P lending and financial concepts here.',
      placement: 'top',
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTutorial}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#4CAF50',
        },
      }}
    />
  );
};

export default TutorialComponent;