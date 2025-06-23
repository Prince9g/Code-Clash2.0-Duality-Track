import { motion } from "framer-motion";
import { Brain, Zap, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Advanced machine learning algorithms trained on millions of images to recognize objects with exceptional accuracy.",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "YOLOv8 Nano model delivers real-time performance while maintaining high detection accuracy across various object classes.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your images are processed securely and never stored. All detection happens locally on our servers.",
      gradient: "from-pink-500 to-rose-600",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            About AI Vision
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Powered by cutting-edge YOLOv8 technology for real-time object detection
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
