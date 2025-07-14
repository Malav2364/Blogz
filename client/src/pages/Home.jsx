import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  PenTool, 
  Users, 
  Zap, 
  Globe, 
  Star, 
  ArrowRight,
  Sparkles,
  BookOpen,
  TrendingUp,
  Shield
} from "lucide-react";

const features = [
  {
    icon: PenTool,
    title: "AI-Powered Writing",
    description: "Get intelligent writing suggestions and content ideas powered by advanced AI"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with fellow writers, share feedback, and grow together"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for seamless writing and publishing experience"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Share your stories with readers worldwide and build your audience"
  }
];

const stats = [
  { label: "Active Writers", value: "10K+", icon: Users },
  { label: "Posts Published", value: "50K+", icon: BookOpen },
  { label: "Monthly Readers", value: "1M+", icon: TrendingUp },
  { label: "Community Rating", value: "4.9★", icon: Star }
];

function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">BlogSmithery</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigate("/explore")}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Explore
          </button>
          <Link 
            to="/login" 
            className="text-slate-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                >
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white">Trusted by 10,000+ writers</span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Write. Share.{" "}
                  <span className="gradient-text bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                    Inspire.
                  </span>
                </h1>

                <p className="text-xl text-slate-300 max-w-2xl">
                  Transform your ideas into compelling stories with our AI-powered writing platform. 
                  Join a community of passionate writers and reach readers worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="btn btn-accent group inline-flex items-center"
                >
                  Start Writing for Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => navigate("/explore")}
                  className="btn btn-secondary"
                >
                  Explore Stories
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 bg-white/20 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-white/20 rounded-lg w-full"></div>
                      <div className="h-4 bg-white/20 rounded-lg w-5/6"></div>
                      <div className="h-8 bg-gradient-to-r from-indigo-500/30 to-pink-500/30 rounded-lg"></div>
                      <div className="h-4 bg-white/20 rounded-lg w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything you need to{" "}
              <span className="gradient-text bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                create amazing content
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our platform combines powerful writing tools with community features 
              to help you craft compelling stories that resonate with your audience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 h-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/20 p-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to start your{" "}
              <span className="gradient-text bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                writing journey?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who are already creating amazing content with BlogSmithery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="btn btn-accent group inline-flex items-center text-lg px-8 py-4"
              >
                Get Started Free
                <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
              <button 
                onClick={() => navigate("/explore")}
                className="btn btn-secondary text-lg px-8 py-4"
              >
                Explore Stories
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;