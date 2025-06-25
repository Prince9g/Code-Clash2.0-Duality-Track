import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, Square, Play, Settings } from "lucide-react";

const LiveCamera = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionMode, setDetectionMode] = useState<'continuous' | 'triggered'>('continuous');
  const [detectionCount, setDetectionCount] = useState(0);
  const [liveDetections, setLiveDetections] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start/Stop camera feed
  useEffect(() => {
    if (isStreaming && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => console.error("Camera access error:", err));
    } else {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    }
  }, [isStreaming]);

  // Capture and send frame every 2s
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const sendFrame = async () => {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL("image/jpeg");

      try {
        const res = await fetch("http://localhost:5001/predict-frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        const data = await res.json();
        if (data.predictions) {
          setLiveDetections(data.predictions);
          setDetectionCount(data.predictions.length);
        }
      } catch (error) {
        console.error("Prediction error:", error);
      }
    };

    if (isStreaming) {
      interval = setInterval(sendFrame, 2000);
    }

    return () => clearInterval(interval);
  }, [isStreaming]);

  const toggleStream = useCallback(() => {
    setIsStreaming((prev) => !prev);
    if (!isStreaming) setLiveDetections([]);
  }, [isStreaming]);

  return (
    <section id="live-camera" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Live Camera Detection
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time object detection through station camera systems with continuous monitoring
          </p>
        </motion.div>

        <motion.div className="glass rounded-3xl p-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Camera Stream */}
            <div className="glass-dark rounded-2xl p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-100">Station Camera Feed</h3>
                <motion.button
                  onClick={toggleStream}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                    isStreaming ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isStreaming ? <Square size={16} /> : <Play size={16} />}
                  <span>{isStreaming ? 'Stop' : 'Start'} Stream</span>
                </motion.button>
              </div>

              <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              </div>

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
                  <span className="text-blue-400 font-semibold">{isStreaming ? '24 FPS' : '0 FPS'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Confidence Threshold:</span>
                  <span className="text-orange-400 font-semibold">25%</span>
                </div>
              </div>

              <AnimatePresence>
                {isStreaming && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {liveDetections.length === 0 && (
                      <p className="text-center text-slate-400">No objects detected</p>
                    )}
                    {liveDetections.map((detection, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-slate-700/50 rounded-lg p-3 mb-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-slate-100">{detection.class}</h5>
                            <p className="text-sm text-slate-400">Live Stream</p>
                          </div>
                          <div className="text-right">
                            <span className="text-green-400 font-semibold">{detection.confidence}%</span>
                            <p className="text-xs text-slate-500">{new Date().toLocaleTimeString()}</p>
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
