import { motion } from "framer-motion";
import { Satellite, Zap, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Satellite,
      title: "Space-Optimized",
      description: "Trained on synthetic data from Falcon digital twin simulation platform, specifically designed for space station environments.",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Zap,
      title: "Mission Critical",
      description: "Real-time detection of essential equipment: toolboxes, oxygen tanks, and fire extinguishers for operational safety.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Shield,
      title: "Reliable Detection",
      description: "Handles challenging space conditions including varied lighting, object angles, and occlusions with high mAP@0.5 accuracy.",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Mission Overview
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced object detection system ensuring space station operational safety through AI-powered equipment identification
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
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
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
