import { motion } from "framer-motion";
import { Satellite, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="flex items-center justify-center space-x-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <Satellite className="text-white text-lg" />
          </div>
          <span className="text-2xl font-bold text-slate-100">Orbital Vision</span>
        </motion.div>

        <motion.p
          className="text-slate-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Space station object detection powered by YOLOv8 and Falcon digital twin technology
        </motion.p>

        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="text-slate-400 hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.label}
            >
              <link.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500 text-sm">
            © 2025 Orbital Vision. Built for Duality AI Space Station Hackathon with YOLOv8.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
