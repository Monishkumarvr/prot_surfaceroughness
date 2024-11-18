import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { useStore } from '../store';
import { AlertTriangle, CheckCircle, Camera, CameraOff } from 'lucide-react';

function LiveFeed() {
  const webcamRef = useRef<Webcam>(null);
  const { settings, addClassification, toggleCamera } = useStore();

  const handleCapture = useCallback(() => {
    if (!settings.isCameraActive) return;
    
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    // Simulated classification - in production, this would call your ML model
    const mockClassification = {
      timestamp: new Date(),
      type: Math.random() > 0.5 ? 'smooth' : 'rough',
      confidence: 0.7 + Math.random() * 0.3,
      imageUrl: imageSrc,
    } as const;

    addClassification(mockClassification);
  }, [addClassification, settings.isCameraActive]);

  React.useEffect(() => {
    const interval = setInterval(handleCapture, settings.captureInterval);
    return () => clearInterval(interval);
  }, [handleCapture, settings.captureInterval]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Surface Analysis</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${settings.isCameraActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-gray-600">
              {settings.isCameraActive ? 'Live' : 'Paused'}
            </span>
          </div>
          <button
            onClick={toggleCamera}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              settings.isCameraActive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {settings.isCameraActive ? (
              <>
                <CameraOff className="w-4 h-4" />
                <span>Stop Camera</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>Start Camera</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Camera Feed</h3>
          </div>
          <div className="aspect-video bg-gray-900">
            {settings.isCameraActive ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <CameraOff className="w-12 h-12 mx-auto mb-2" />
                  <p>Camera is turned off</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Latest Classification</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Smooth Surface</span>
              </div>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Confidence</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '98%' }}
                  />
                </div>
              </div>
              {settings.enableAlerts && (
                <div className="flex items-center space-x-2 text-sm text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Surface quality above threshold</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveFeed;