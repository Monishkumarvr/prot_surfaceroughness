import React from 'react';
import Sidebar from './components/Sidebar';
import LiveFeed from './components/LiveFeed';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ClassificationHistory from './components/ClassificationHistory';
import SettingsPanel from './components/Settings';
import { useStore } from './store';

function App() {
  const { currentView } = useStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {currentView === 'live' && <LiveFeed />}
          {currentView === 'analytics' && <AnalyticsDashboard />}
          {currentView === 'history' && <ClassificationHistory />}
          {currentView === 'settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}

export default App;