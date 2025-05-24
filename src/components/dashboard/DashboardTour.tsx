import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

const DashboardTour: React.FC = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if the tour has been completed before
    const tourCompleted = localStorage.getItem('dashboardTourCompleted');
    if (!tourCompleted) {
      setRun(true);
    }
  }, []);

  const steps: Step[] = [
    {
      target: '.project-selector',
      content: 'Welcome to ClashSense! Start by selecting a project to manage your clash detection and coordination tasks.',
      disableBeacon: true,
      placement: 'bottom',
    },
    {
      target: '.clash-overview',
      content: 'Get a quick overview of all clash statistics and their severity levels.',
      placement: 'bottom',
    },
    {
      target: '.clash-analysis',
      content: 'Upload and analyze clash reports with our AI-powered system for intelligent resolution suggestions.',
      placement: 'left',
    },
    {
      target: '.clash-todo',
      content: 'Track and manage your clash resolution tasks with our intuitive task list.',
      placement: 'right',
    },
    {
      target: '.clash-progress',
      content: 'Monitor resolution progress across different disciplines and project phases.',
      placement: 'left',
    },
    {
      target: '.recent-updates',
      content: 'Stay up to date with the latest model changes and team activities.',
      placement: 'top',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Mark the tour as completed
      localStorage.setItem('dashboardTourCompleted', 'true');
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: '#3b82f6',
          textColor: '#1e293b',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
        },
        tooltip: {
          padding: '20px',
        },
        buttonNext: {
          backgroundColor: '#3b82f6',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 500,
        },
        buttonBack: {
          marginRight: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 500,
        },
        buttonSkip: {
          color: '#64748b',
          fontSize: '14px',
          fontWeight: 500,
        },
      }}
      callback={handleJoyrideCallback}
      locale={{
        last: 'End tour',
        skip: 'Skip tour',
      }}
    />
  );
};

export default DashboardTour;