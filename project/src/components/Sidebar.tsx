import React from 'react';
import { Camera, BarChart3, History, Settings } from 'lucide-react';
import { useStore } from '../store';

function Sidebar() {
  const { currentView, setCurrentView } = useStore();

  const menuItems = [
    { id: 'live', icon: Camera, label: 'Live Feed' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ] as const;

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Surface Analysis</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`w-full flex items-center px-6 py-3 text-left ${
              currentView === id ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;