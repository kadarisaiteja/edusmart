import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DocumentManager from './components/DocumentManager';
import AssessmentCenter from './components/AssessmentCenter';
import Analytics from './components/Analytics';
import StudyRecommendations from './components/StudyRecommendations';
import Navigation from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user] = useState({
    name: 'Alex Johnson',
    level: 'Intermediate',
    streak: 12,
    totalPoints: 1847,
    completedCourses: 8,
    studyTime: 47 // hours
  });

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'documents':
        return <DocumentManager />;
      case 'assessments':
        return <AssessmentCenter />;
      case 'analytics':
        return <Analytics user={user} />;
      case 'recommendations':
        return <StudyRecommendations user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      <main className="ml-64 p-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;