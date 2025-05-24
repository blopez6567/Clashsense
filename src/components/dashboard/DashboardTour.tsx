import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

interface DashboardTourProps {
  isFirstVisit?: boolean;
}

const DashboardTour: React.FC<DashboardTourProps> = ({ isFirstVisit = true }) => {
  const [run, setRun] = useState(isFirstVisit);

  const steps: Step[] = [
    {
      target: '.project-selector',
      content: 'Browse and select from your active projects. Click on any project card to view its details and coordination status.',
      disableBeacon: true,
    },
    {
      target: '.view-toggle',
      content: 'Switch between Simple and Advanced views. Simple view focuses on essential clash detection, while Advanced view shows comprehensive project analytics.',
    },
    {
      target: '.quick-clash-analysis',
      content: 'Upload clash images for instant AI-powered analysis using either OpenAI Vision or Google Vision AI.',
    },
    {
      target: '.model-summary',
      content: 'Get a quick overview of your project models, team members, and clash statistics.',
    },
    {
      target: '.clash-overview',
      content: 'View detailed breakdown of clashes by severity, type, and location. Click to expand categories for more details.',
    },
    {
      target: '.coordination-goals',
      content: 'Track progress towards coordination milestones and view recent achievements.',
    },
    {
      target: '.clash-todo',
      content: 'Manage and prioritize clash resolution tasks. Filter by discipline, severity, and status.',
    },
    {
      target: '.clash-progress',
      content: 'Monitor resolution progress across different disciplines and track overall completion rates.',
    },
    {
      target: '.xml-viewer',
      content: 'Upload and analyze clash detection XML reports. View analytics and get AI-powered resolution suggestions.',
    },
    {
      target: '.recent-updates',
      content: 'Stay informed about recent model updates and coordination activities.',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      // Save tour completion status to localStorage
      localStorage.setItem('dashboardTourCompleted', 'true');
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
          primaryColor: '#2563eb',
          zIndex: 1000,
        },
        tooltip: {
          padding: '1rem',
        },
        buttonNext: {
          backgroundColor: '#2563eb',
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
      callback={handleJoyrideCallback}
      locale={{
        last: "Got it!",
        skip: "Skip tour"
      }}
    />
  );
};

export default DashboardTour;