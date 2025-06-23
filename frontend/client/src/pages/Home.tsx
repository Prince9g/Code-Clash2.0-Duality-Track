import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowToUse from "@/components/HowToUse";
import TechStack from "@/components/TechStack";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen animated-bg text-slate-100">
      <Navigation />
      <Hero />
      <About />
      <HowToUse />
      <TechStack />
      <Demo />
      <Footer />
    </div>
  );
};

export default Home;
