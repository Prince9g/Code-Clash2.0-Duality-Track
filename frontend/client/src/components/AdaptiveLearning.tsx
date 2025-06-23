import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Map, Clock, Zap, Target } from "lucide-react";

const AdaptiveLearning = () => {
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'speed' | 'coverage'>('accuracy');

  const learningMetrics = {
    accuracy: {
      value: 94.7,
      trend: '+2.3%',
      description: 'Model accuracy improvement over time',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
    },
    speed: {
      value: 23.8,
      trend: '+4.1 FPS',
      description: 'Detection processing speed enhancement',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
    },
    coverage: {
      value: 87.2,
      trend: '+12%',
      description: 'Station area coverage mapping',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
    },
  };

  const adaptationFeatures = [
    {
      icon: Brain,
      title: "Pattern Recognition",
      description: "AI learns equipment placement patterns and usage frequency across different station modules.",
      metrics: ["Usage patterns", "Placement frequency", "Temporal analysis"],
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: Map,
      title: "Spatial Intelligence",
      description: "3D mapping of object locations with predictive positioning based on crew activities.",
      metrics: ["3D coordinates", "Movement tracking", "Zone analysis"],
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Clock,
      title: "Temporal Learning",
      description: "Time-based analysis to predict when and where equipment will be needed.",
      metrics: ["Usage schedules", "Predictive alerts", "Activity cycles"],
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Continuous model refinement based on detection success rates and feedback.",
      metrics: ["Accuracy tuning", "Speed optimization", "Error reduction"],
      gradient: "from-blue-500 to-cyan-600",
    },
  ];

  const trainingData = [
    { module: "Command Module", objects: 156, accuracy: 96.2, updated: "2 hours ago" },
    { module: "Laboratory", objects: 203, accuracy: 94.8, updated: "4 hours ago" },
    { module: "Storage Bay", objects: 89, accuracy: 91.3, updated: "6 hours ago" },
    { module: "Maintenance", objects: 174, accuracy: 95.7, updated: "1 hour ago" },
  ];

  return (
    <section id="adaptive-learning" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
            Adaptive Learning System
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Self-improving AI that learns from station operations and equipment usage patterns
          </p>
        </motion.div>

        {/* Learning Metrics Dashboard */}
        <motion.div
          className="glass rounded-3xl p-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-slate-100">Learning Performance Metrics</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(learningMetrics).map(([key, metric]) => (
              <motion.div
                key={key}
                className={`glass-dark rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedMetric === key ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedMetric(key as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-slate-100 capitalize">{key}</h4>
                  <span className={`text-sm font-semibold ${metric.color}`}>{metric.trend}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-slate-100">{metric.value}%</span>
                  <div className={`flex-1 h-2 rounded-full ${metric.bgColor}`}>
                    <motion.div
                      className={`h-full rounded-full ${metric.color.replace('text-', 'bg-')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400 mt-2">{metric.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Module Training Status */}
          <div className="glass-dark rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-slate-100">Module Training Status</h4>
            <div className="space-y-3">
              {trainingData.map((module, index) => (
                <motion.div
                  key={module.module}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <div>
                      <h5 className="font-medium text-slate-100">{module.module}</h5>
                      <p className="text-sm text-slate-400">{module.objects} objects tracked</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-semibold">{module.accuracy}%</span>
                    <p className="text-xs text-slate-500">{module.updated}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Adaptation Features */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {adaptationFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="text-2xl text-white" size={24} />
              </motion.div>
              
              <h3 className="text-2xl font-semibold mb-4 text-slate-100">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-6">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metricIndex}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: metricIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Target size={12} className="text-slate-400" />
                    <span className="text-slate-400 text-sm">{metric}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdaptiveLearning;