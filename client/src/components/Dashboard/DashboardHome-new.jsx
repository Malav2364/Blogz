import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOverviewStats } from "../../services/dashboardService";
import { toast } from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  PenTool, 
  Eye, 
  Heart, 
  Users, 
  TrendingUp, 
  BookOpen,
  Calendar,
  Star,
  Award,
  Target,
  Activity,
  BarChart3,
  ArrowUpRight
} from "lucide-react";

function DashboardHome() {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getOverviewStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const quickActions = [
    {
      title: "Write New Story",
      description: "Start crafting your next masterpiece",
      icon: PenTool,
      action: () => navigate("/dashboard/create"),
      gradient: "from-indigo-500 to-purple-600",
      featured: true
    },
    {
      title: "Explore Stories",
      description: "Discover amazing content",
      icon: BookOpen,
      action: () => navigate("/dashboard/explore"),
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "My Profile",
      description: "Manage your profile",
      icon: Users,
      action: () => navigate("/dashboard/profile"),
      gradient: "from-green-500 to-teal-600"
    },
    {
      title: "Analytics",
      description: "View detailed insights",
      icon: BarChart3,
      action: () => navigate("/dashboard/analytics"),
      gradient: "from-orange-500 to-amber-600"
    }
  ];

  const achievements = [
    { title: "First Story Published", description: "Welcome to the community!", icon: Star, unlocked: true },
    { title: "10 Hearts Received", description: "Your content is loved!", icon: Heart, unlocked: stats?.totalLikes >= 10 },
    { title: "100 Views Milestone", description: "Great reach!", icon: Eye, unlocked: stats?.totalViews >= 100 },
    { title: "Consistent Writer", description: "Published 5 stories", icon: Award, unlocked: stats?.totalPosts >= 5 },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-2xl p-6 animate-pulse">
              <div className="w-12 h-12 bg-white/20 rounded-lg mb-4"></div>
              <div className="h-6 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome back, {user?.name}! ✨
        </h1>
        <p className="text-xl text-slate-300">
          Ready to create something amazing today?
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Stories",
            value: stats?.totalPosts || 0,
            icon: BookOpen,
            gradient: "from-indigo-500 to-purple-600",
            change: "+2 this week"
          },
          {
            title: "Total Views",
            value: stats?.totalViews || 0,
            icon: Eye,
            gradient: "from-pink-500 to-rose-600",
            change: "+125 this week"
          },
          {
            title: "Hearts Received",
            value: stats?.totalLikes || 0,
            icon: Heart,
            gradient: "from-green-500 to-teal-600",
            change: "+8 this week"
          },
          {
            title: "Followers",
            value: stats?.totalFollowers || 0,
            icon: Users,
            gradient: "from-orange-500 to-amber-600",
            change: "+3 this week"
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value.toLocaleString()}</h3>
            <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
            <p className="text-green-400 text-xs">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 cursor-pointer hover:bg-white/15 transition-all duration-300 ${
                action.featured ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{action.title}</h3>
                  <p className="text-slate-400">{action.description}</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-slate-400" />
              </div>
              {action.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs rounded-full">
                    Featured
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {[
              { action: "Published", item: "\"My Journey with React\"", time: "2 hours ago", type: "publish" },
              { action: "Received", item: "5 new hearts", time: "1 day ago", type: "like" },
              { action: "Gained", item: "3 new followers", time: "2 days ago", type: "follow" },
              { action: "Updated", item: "Profile information", time: "3 days ago", type: "update" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'publish' ? 'bg-green-400' :
                  activity.type === 'like' ? 'bg-red-400' :
                  activity.type === 'follow' ? 'bg-blue-400' : 'bg-yellow-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="text-slate-300">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-slate-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Achievements</h3>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  achievement.unlocked ? 'bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-indigo-500/30' : 'bg-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.unlocked ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-white/10'
                }`}>
                  <achievement.icon className={`w-5 h-5 ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                    {achievement.title}
                  </p>
                  <p className="text-slate-500 text-sm">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Writing Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">This Month's Goals</h3>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
            Update Goals
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { goal: "Publish 4 Stories", progress: 2, total: 4, color: "indigo" },
            { goal: "Reach 500 Views", progress: 340, total: 500, color: "pink" },
            { goal: "Gain 20 Followers", progress: 12, total: 20, color: "green" }
          ].map((goal, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{goal.goal}</h4>
                <span className="text-slate-300 text-sm">{goal.progress}/{goal.total}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 bg-gradient-to-r from-${goal.color}-500 to-${goal.color}-600 rounded-full transition-all duration-300`}
                  style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-slate-400 text-xs mt-2">
                {Math.round((goal.progress / goal.total) * 100)}% complete
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardHome;
