import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, Loader2, Search, RefreshCw } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Detection } from "@shared/schema";

interface PredictionResponse {
  predictions: Detection[];
  message?: string;
  error?: string;
}

const Demo = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Detection[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const predictMutation = useMutation({
    mutationFn: async (file: File): Promise<PredictionResponse> => {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        body: formData,
      });
      return response.json();

    },
    onSuccess: (data) => {
      setPredictions(data.predictions || []);
      toast({
        title: "Analysis Complete",
        description: data.message || "Image processed successfully",
      });
    },
    onError: (error) => {
      console.error("Prediction error:", error);
      toast({
        title: "Analysis Failed",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file (JPG, PNG, WEBP)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setPredictions([]);
      predictMutation.mutate(file);
    };
    reader.readAsDataURL(file);
  }, [toast, predictMutation]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  const resetDemo = () => {
    setUploadedImage(null);
    setPredictions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const confidenceColors = [
    "text-green-400 bg-green-400/20",
    "text-blue-400 bg-blue-400/20",
    "text-purple-400 bg-purple-400/20",
    "text-pink-400 bg-pink-400/20",
    "text-yellow-400 bg-yellow-400/20",
    "text-red-400 bg-red-400/20",
  ];

  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Try the Demo
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Upload an image and experience real-time object detection
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-3xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!uploadedImage ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Upload Area */}
                <motion.div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragOver
                      ? "border-indigo-400 bg-indigo-400/10"
                      : "border-indigo-400/50 hover:border-indigo-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ y: isDragOver ? -10 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CloudUpload className="text-6xl text-indigo-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold mb-4 text-slate-100">
                      Drop your image here
                    </h3>
                    <p className="text-slate-300 mb-6">or click to browse files</p>
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Choose File
                    </motion.button>
                    <p className="text-sm text-slate-400 mt-4">
                      Supports JPG, PNG, WEBP • Max 10MB
                    </p>
                  </motion.div>
                </motion.div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {predictMutation.isPending ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-16 h-16 text-indigo-400 mx-auto mb-6 animate-spin" />
                    <h3 className="text-2xl font-semibold mb-2 text-slate-100">
                      Analyzing Image...
                    </h3>
                    <p className="text-slate-300">
                      Our AI is detecting objects in your image
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="grid md:grid-cols-2 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Image Display */}
                    <div className="glass-dark rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-slate-100">
                        Uploaded Image
                      </h3>
                      <div className="aspect-square bg-slate-800 rounded-xl overflow-hidden">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Detection Results */}
                    <div className="glass-dark rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-slate-100">
                        Detection Results
                      </h3>
                      
                      {predictions.length > 0 ? (
                        <motion.div
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                        >
                          {predictions.map((prediction, index) => {
                            const colorClass = confidenceColors[index % confidenceColors.length];
                            const [textColor, bgColor] = colorClass.split(" ");
                            
                            return (
                              <motion.div
                                key={index}
                                className={`flex items-center justify-between p-3 bg-slate-700/50 rounded-lg`}
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${bgColor.replace("/20", "")}`} />
                                  <span className="font-medium text-slate-100 capitalize">
                                    {prediction.class}
                                  </span>
                                </div>
                                <span className={`font-semibold ${textColor}`}>
                                  {(prediction.confidence * 100).toFixed(1)}%
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      ) : (
                        <motion.div
                          className="text-center py-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Search className="text-4xl text-slate-400 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold mb-2 text-slate-100">
                            No Objects Detected
                          </h4>
                          <p className="text-slate-400">
                            Try uploading a different image with clearer objects
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={resetDemo}
                    className="px-8 py-3 glass rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 text-slate-100 inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={18} />
                    Try Another Image
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
