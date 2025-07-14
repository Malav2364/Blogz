import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { logoutUser } from "../services/authService";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home,
  Search,
  PenTool,
  User,
  Bell,
  Menu,
  X,
  LogOut,
  Sparkles,
  Settings,
  BookOpen,
  TrendingUp,
  Users,
  BarChart3
} from "lucide-react";
import NotificationDropdown from "../components/NotificationDropdown";

const navItems = [
  { label: "Overview", path: "/dashboard", icon: Home },
  { label: "Explore", path: "/dashboard/explore", icon: Search },
  { label: "Create Story", path: "/dashboard/create", icon: PenTool },
  { label: "My Stories", path: "/dashboard/my-posts", icon: BookOpen },
  { label: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { label: "Profile", path: "/dashboard/profile", icon: User },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActivePath = (path) => location.pathname === path;

  const getPageTitle = () => {
    const currentItem = navItems.find(item => isActivePath(item.path));
    return currentItem?.label || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative flex">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:z-auto ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">BlogSmithery</h1>
                <p className="text-sm text-slate-400">Creative Writing Hub</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all group ${
                  isActivePath(item.path)
                    ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActivePath(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
                {isActivePath(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="px-4 mb-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-medium mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Stories</span>
                  <span className="text-white font-medium">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Followers</span>
                  <span className="text-white font-medium">248</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Views</span>
                  <span className="text-white font-medium">1.2k</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/10 backdrop-blur-xl border-b border-white/20">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>

            {/* Page Title */}
            <div className="hidden lg:block">
              <motion.h2 
                key={location.pathname}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                {getPageTitle()}
              </motion.h2>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </motion.div>
              </div>

              {/* Create Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard/create")}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all"
              >
                <PenTool className="w-4 h-4" />
                <span>Write</span>
              </motion.button>

              {/* User Avatar (Mobile) */}
              <div className="lg:hidden">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative z-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;