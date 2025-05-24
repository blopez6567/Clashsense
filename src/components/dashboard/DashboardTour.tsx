import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

interface DashboardTourProps {
  isFirstVisit?: boolean;
}

const DashboardTour: React.FC<DashboardTourProps> = ({ isFirstVisit = true }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Delay the start of the tour to ensure all elements are rendered
  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => setRun(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  const steps: Step[] = [
    {
      target: '.project-selector',
      content: 'Browse and select from your active projects. Click on any project card to view its details and coordination status.',
      disableBeacon: true,
      placement: 'bottom',
    },
    {
      target: '.view-toggle',
      content: 'Switch between Simple and Advanced views. Simple view focuses on essential clash detection, while Advanced view shows comprehensive project analytics.',
      placement: 'left',
    },
    {
      target: '.quick-clash-analysis',
      content: 'Upload clash images for instant AI-powered analysis using either OpenAI Vision or Google Vision AI.',
      placement: 'bottom',
    },
    {
      target: '.model-summary',
      content: 'Get a quick overview of your project models, team members, and clash statistics.',
      placement: 'bottom',
    },
    {
      target: '.clash-overview',
      content: 'View detailed breakdown of clashes by severity, type, and location. Click to expand categories for more details.',
      placement: 'bottom',
    },
    {
      target: '.coordination-goals',
      content: 'Track progress towards coordination milestones and view recent achievements.',
      placement: 'left',
    },
    {
      target: '.clash-todo',
      content: 'Manage and prioritize clash resolution tasks. Filter by discipline, severity, and status.',
      placement: 'bottom',
    },
    {
      target: '.clash-progress',
      content: 'Monitor resolution progress across different disciplines and track overall completion rates.',
      placement: 'left',
    },
    {
      target: '.xml-viewer',
      content: 'Upload and analyze clash detection XML reports. View analytics and get AI-powered resolution suggestions.',
      placement: 'top',
    },
    {
      target: '.recent-updates',
      content: 'Stay informed about recent model updates and coordination activities.',
      placement: 'top',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      localStorage.setItem('dashboardTourCompleted', 'true');
    } else if (type === 'step:after') {
      setStepIndex(index + 1);
    }

    // Handle tour interruption
    if (action === 'close' || status === STATUS.SKIPPED) {
      const shouldRestart = window.confirm('Would you like to restart the tour later? You can always access it from the help menu.');
      if (shouldRestart) {
        localStorage.removeItem('dashboardTourCompleted');
      } else {
        localStorage.setItem('dashboardTourCompleted', 'true');
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      styles={{
        options: {
          primaryColor: '#2563eb',
          zIndex: 1000,
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        },
        tooltip: {
          padding: '1rem',
          borderRadius: '0.5rem',
        },
        buttonNext: {
          backgroundColor: '#2563eb',
          borderRadius: '0.375rem',
          padding: '0.5rem 1rem',
        },
        buttonBack: {
          marginRight: 10,
          color: '#2563eb',
          padding: '0.5rem 1rem',
        },
        buttonSkip: {
          color: '#6b7280',
        },
        overlay: {
          mixBlendMode: 'normal',
        },
      }}
      callback={handleJoyrideCallback}
      locale={{
        last: "Finish Tour",
        skip: "Skip Tour",
        next: "Next",
        back: "Back",
      }}
      floaterProps={{
        disableAnimation: true,
      }}
    />
  );
};

export default DashboardTour;