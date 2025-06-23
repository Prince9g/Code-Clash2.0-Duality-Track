import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, Square, Play, Pause, Settings } from "lucide-react";

const LiveCamera = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionMode, setDetectionMode] = useState<'continuous' | 'triggered'>('continuous');
  const [detectionCount, setDetectionCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleStream = useCallback(() => {
    setIsStreaming(!isStreaming);
    if (!isStreaming) {
      setDetectionCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }
  }, [isStreaming]);

  const mockDetections = [
    { id: 1, object: 'Toolbox', confidence: 94.2, location: 'Module A-2', timestamp: new Date().toLocaleTimeString() },
    { id: 2, object: 'Oxygen Tank', confidence: 89.7, location: 'Module B-1', timestamp: new Date().toLocaleTimeString() },
    { id: 3, object: 'Fire Extinguisher', confidence: 92.1, location: 'Module C-3', timestamp: new Date().toLocaleTimeString() },
  ];

  return (
    <section id="live-camera" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Live Camera Detection
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time object detection through station camera systems with continuous monitoring
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-3xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Camera Feed Simulation */}
            <div className="glass-dark rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-100">Station Camera Feed</h3>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={toggleStream}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isStreaming 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isStreaming ? <Square size={16} /> : <Play size={16} />}
                    <span>{isStreaming ? 'Stop' : 'Start'} Stream</span>
                  </motion.button>
                </div>
              </div>

              <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden relative">
                {isStreaming ? (
                  <motion.div
                    className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-blue-500/20"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="text-slate-300 text-center">
                      <Video className="w-12 h-12 mx-auto mb-2" />
                      <p>Live Station Feed Active</p>
                      <p className="text-sm text-slate-400">Real-time Detection Running</p>
                    </div>
                    
                    {/* Simulated detection boxes */}
                    <motion.div
                      className="absolute top-4 left-4 w-20 h-16 border-2 border-green-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <span className="text-xs text-green-400 bg-black/50 px-1">Toolbox 94%</span>
                    </motion.div>
                    
                    <motion.div
                      className="absolute bottom-8 right-8 w-16 h-20 border-2 border-blue-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    >
                      <span className="text-xs text-blue-400 bg-black/50 px-1">O2 Tank 89%</span>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <Camera className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Camera Feed Inactive</p>
                      <p className="text-sm">Click Start Stream to begin detection</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Detection Settings */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-slate-300">Detection Mode:</span>
                  <select
                    value={detectionMode}
                    onChange={(e) => setDetectionMode(e.target.value as 'continuous' | 'triggered')}
                    className="bg-slate-700 text-slate-100 rounded px-3 py-1 text-sm"
                  >
                    <option value="continuous">Continuous</option>
                    <option value="triggered">Motion Triggered</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Settings size={16} />
                  <span className="text-sm">mAP: 0.847</span>
                </div>
              </div>
            </div>

            {/* Detection Results */}
            <div className="glass-dark rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-100">Live Detection Results</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Active Detections:</span>
                  <span className="text-green-400 font-semibold">{isStreaming ? detectionCount : 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Processing Speed:</span>
                  <span className="text-blue-400 font-semibold">{isStreaming ? '24.3 FPS' : '0 FPS'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Confidence Threshold:</span>
                  <span className="text-orange-400 font-semibold">85%</span>
                </div>
              </div>

              <AnimatePresence>
                {isStreaming && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h4 className="text-lg font-medium text-slate-100 mb-3">Recent Detections</h4>
                    {mockDetections.map((detection) => (
                      <motion.div
                        key={detection.id}
                        className="bg-slate-700/50 rounded-lg p-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: detection.id * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-slate-100">{detection.object}</h5>
                            <p className="text-sm text-slate-400">{detection.location}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-green-400 font-semibold">{detection.confidence}%</span>
                            <p className="text-xs text-slate-500">{detection.timestamp}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isStreaming && (
                <div className="text-center py-8 text-slate-400">
                  <p>Start camera stream to see live detection results</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveCamera;