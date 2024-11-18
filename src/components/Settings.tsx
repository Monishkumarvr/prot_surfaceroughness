import React from 'react';
import { useStore } from '../store';
import { Save } from 'lucide-react';

function SettingsPanel() {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = React.useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label
              htmlFor="sensitivityThreshold"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Classification Sensitivity Threshold
            </label>
            <input
              type="range"
              id="sensitivityThreshold"
              min="0"
              max="1"
              step="0.1"
              value={formData.sensitivityThreshold}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sensitivityThreshold: parseFloat(e.target.value),
                }))
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Low</span>
              <span>{(formData.sensitivityThreshold * 100).toFixed(0)}%</span>
              <span>High</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="captureInterval"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Capture Interval (ms)
            </label>
            <input
              type="number"
              id="captureInterval"
              min="100"
              max="5000"
              step="100"
              value={formData.captureInterval}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  captureInterval: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableAlerts"
              checked={formData.enableAlerts}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  enableAlerts: e.target.checked,
                }))
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="enableAlerts"
              className="ml-2 block text-sm text-gray-900"
            >
              Enable Anomaly Alerts
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPanel;