import { motion } from "framer-motion";
import { Camera, Palette, Brain, MapPin } from "lucide-react";

const Innovations = () => {
  const innovations = [
    {
      icon: Camera,
      title: "Live Camera Detection",
      description: "Real-time object detection through station camera feeds with continuous monitoring and instant alerts for critical equipment identification.",
      features: ["Real-time video processing", "Instant equipment alerts", "Multi-camera integration", "24/7 monitoring"],
      gradient: "from-blue-500 to-cyan-600",
      iconColor: "text-blue-400",
    },
    {
      icon: Palette,
      title: "Blur & Color Intelligence",
      description: "Advanced image processing that handles blurry conditions using color preference algorithms for enhanced detection reliability.",
      features: ["Motion blur compensation", "Color-based classification", "Low-light adaptation", "Enhanced clarity filters"],
      gradient: "from-purple-500 to-pink-600",
      iconColor: "text-purple-400",
    },
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "Self-improving model that learns equipment placement patterns over time, continuously updating detection capabilities through station operations.",
      features: ["Continuous learning", "Pattern recognition", "Placement mapping", "Performance optimization"],
      gradient: "from-green-500 to-emerald-600",
      iconColor: "text-green-400",
    },
    {
      icon: MapPin,
      title: "Spatial Intelligence",
      description: "Advanced spatial tracking system that maps object locations across station modules, enabling predictive detection based on usage patterns.",
      features: ["3D spatial mapping", "Location prediction", "Usage pattern analysis", "Module-based tracking"],
      gradient: "from-orange-500 to-red-600",
      iconColor: "text-orange-400",
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
    <section id="innovations" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Innovation Features
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Next-generation enhancements pushing the boundaries of space station object detection
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${innovation.gradient} rounded-2xl flex items-center justify-center mb-6`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <innovation.icon className="text-2xl text-white" size={24} />
              </motion.div>
              
              <h3 className="text-2xl font-semibold mb-4 text-slate-100">{innovation.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-6">{innovation.description}</p>
              
              <div className="space-y-2">
                {innovation.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-2 h-2 rounded-full ${innovation.gradient.replace('from-', 'bg-').split(' ')[0]}`} />
                    <span className="text-slate-400 text-sm">{feature}</span>
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

export default Innovations;