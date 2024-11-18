import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../store';
import { CheckCircle, XCircle, Search, Trash2 } from 'lucide-react';

function ClassificationHistory() {
  const { classifications, clearHistory } = useStore();
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'smooth' | 'rough'>('all');
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

  const filteredClassifications = classifications.filter((c) => {
    if (filter !== 'all' && c.type !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        c.type.includes(searchLower) ||
        format(c.timestamp, 'PPpp').toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleClearHistory = () => {
    if (classifications.length === 0) return;
    setShowConfirmDelete(true);
  };

  const confirmClearHistory = () => {
    clearHistory();
    setShowConfirmDelete(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Classification History</h2>
        <button
          onClick={handleClearHistory}
          className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={classifications.length === 0}
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search classifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="smooth">Smooth Only</option>
          <option value="rough">Rough Only</option>
        </select>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to clear all classification history? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearHistory}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClassifications.map((classification) => (
              <tr key={classification.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {classification.type === 'smooth' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span className="capitalize">{classification.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(classification.timestamp, 'PPpp')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        classification.type === 'smooth'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${classification.confidence * 100}%` }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={classification.imageUrl}
                    alt={`Surface ${classification.type}`}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassificationHistory;