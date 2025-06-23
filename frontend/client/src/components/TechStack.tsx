import { motion } from "framer-motion";
import { SiReact, SiTailwindcss, SiPython, SiVite, SiFramer } from "react-icons/si";
import { Bot, Rocket, Network, Server } from "lucide-react";

const TechStack = () => {
  const technologies = [
    {
      icon: SiReact,
      name: "React",
      description: "Frontend Framework",
      color: "text-blue-400",
      hoverAnimation: "animate-spin",
    },
    {
      icon: SiTailwindcss,
      name: "Tailwind CSS",
      description: "Styling",
      color: "text-cyan-400",
      hoverAnimation: "rotate-12",
    },
    {
      icon: SiPython,
      name: "Flask",
      description: "Backend API",
      color: "text-yellow-400",
      hoverAnimation: "animate-bounce",
    },
    {
      icon: Bot,
      name: "YOLOv8",
      description: "AI Model",
      color: "text-purple-400",
      hoverAnimation: "animate-pulse",
    },
    {
      icon: SiVite,
      name: "Vite",
      description: "Build Tool",
      color: "text-orange-400",
      hoverAnimation: "animate-pulse",
    },
    {
      icon: SiFramer,
      name: "Framer Motion",
      description: "Animations",
      color: "text-pink-400",
      hoverAnimation: "rotate-12",
    },
    {
      icon: Network,
      name: "Axios",
      description: "HTTP Client",
      color: "text-green-400",
      hoverAnimation: "scale-110",
    },
    {
      icon: Server,
      name: "REST API",
      description: "Communication",
      color: "text-red-400",
      hoverAnimation: "animate-bounce",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="tech-stack" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technologies Used
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Built with modern technologies for optimal performance and user experience
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="mb-4"
                whileHover={{
                  rotate: tech.hoverAnimation.includes("rotate") ? 12 : 0,
                  scale: tech.hoverAnimation.includes("scale") ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <tech.icon 
                  className={`text-5xl ${tech.color} mx-auto ${
                    tech.hoverAnimation.includes("animate") ? `group-hover:${tech.hoverAnimation}` : ""
                  }`} 
                  size={48} 
                />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">{tech.name}</h3>
              <p className="text-sm text-slate-400">{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
