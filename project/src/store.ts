import { create } from 'zustand';

interface ClassificationResult {
  id: string;
  timestamp: Date;
  type: 'smooth' | 'rough';
  confidence: number;
  imageUrl: string;
}

interface State {
  currentView: 'live' | 'analytics' | 'history' | 'settings';
  classifications: ClassificationResult[];
  settings: {
    sensitivityThreshold: number;
    captureInterval: number;
    enableAlerts: boolean;
    isCameraActive: boolean;
  };
  setCurrentView: (view: State['currentView']) => void;
  addClassification: (result: Omit<ClassificationResult, 'id'>) => void;
  updateSettings: (settings: Partial<State['settings']>) => void;
  clearHistory: () => void;
  toggleCamera: () => void;
}

export const useStore = create<State>((set) => ({
  currentView: 'live',
  classifications: [],
  settings: {
    sensitivityThreshold: 0.8,
    captureInterval: 1000,
    enableAlerts: true,
    isCameraActive: true,
  },
  setCurrentView: (view) => set({ currentView: view }),
  addClassification: (result) =>
    set((state) => ({
      classifications: [
        { ...result, id: crypto.randomUUID() },
        ...state.classifications,
      ],
    })),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  clearHistory: () => set({ classifications: [] }),
  toggleCamera: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        isCameraActive: !state.settings.isCameraActive,
      },
    })),
}));