import { motion } from "framer-motion";
import { Upload, Settings, Eye } from "lucide-react";

const HowToUse = () => {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: "Upload Image",
      description: "Click or drag & drop your image into the upload area. Supports JPG, PNG, and WEBP formats.",
      gradient: "from-indigo-500 to-purple-600",
      iconColor: "text-indigo-400",
    },
    {
      number: 2,
      icon: Settings,
      title: "AI Processing",
      description: "Our YOLOv8 model analyzes your image and identifies all objects with confidence scores.",
      gradient: "from-green-500 to-emerald-600",
      iconColor: "text-green-400",
    },
    {
      number: 3,
      icon: Eye,
      title: "View Results",
      description: "See detected objects with bounding boxes, class names, and confidence percentages.",
      gradient: "from-pink-500 to-rose-600",
      iconColor: "text-pink-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
    <section id="how-to-use" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            How to Use
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get started with object detection in three simple steps
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={itemVariants}
            >
              <motion.div
                className="glass-dark rounded-3xl p-8 mb-6 group-hover:scale-105 transition-transform duration-300"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className={`text-4xl ${step.iconColor} mb-4 mx-auto`} size={48} />
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-4 text-slate-100">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUse;
