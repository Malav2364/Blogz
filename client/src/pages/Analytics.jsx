import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  Calendar,
  Globe,
  Share2,
  BookOpen,
  Clock,
  Target,
  Award
} from "lucide-react";
import BarChart from "../components/SimpleBarChart";
import LineChart from "../components/SimpleLineChart";
import PieChart from "../components/SimplePieChart";

// Mock data - replace with actual API calls
const mockAnalytics = {
  overview: {
    totalViews: 15420,
    totalLikes: 892,
    totalComments: 234,
    totalShares: 156,
    totalPosts: 12,
    totalFollowers: 456,
    engagementRate: 6.2,
    avgReadTime: "3.5 min"
  },
  viewsChart: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [1200, 1900, 3000, 5000, 2000, 3000, 4500]
  },
  engagementChart: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Views",
        data: [4500, 5200, 6100, 7300],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)"
      },
      {
        label: "Likes",
        data: [245, 312, 389, 456],
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)"
      },
      {
        label: "Comments",
        data: [89, 124, 156, 198],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)"
      }
    ]
  },
  topPosts: [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      views: 5200,
      likes: 234,
      comments: 67,
      engagementRate: 8.5
    },
    {
      id: 2,
      title: "The Future of Web Development",
      views: 3800,
      likes: 189,
      comments: 45,
      engagementRate: 7.2
    },
    {
      id: 3,
      title: "Modern CSS Techniques",
      views: 2900,
      likes: 156,
      comments: 32,
      engagementRate: 6.8
    }
  ],
  audienceData: {
    labels: ["Mobile", "Desktop", "Tablet"],
    data: [65, 30, 5],
    backgroundColor: ["#3B82F6", "#EF4444", "#10B981"]
  },
  trafficSources: {
    labels: ["Direct", "Social Media", "Search", "Referral"],
    data: [40, 30, 20, 10],
    backgroundColor: ["#8B5CF6", "#F59E0B", "#06B6D4", "#84CC16"]
  }
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        setTimeout(() => {
          setAnalytics(mockAnalytics);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]); // timeRange is sufficient as dependency

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ title, value, icon: Icon, color, change, isPercentage = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">
          {isPercentage ? `${value}%` : typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="text-slate-400 text-sm">{title}</p>
      </div>
    </motion.div>
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
              <div className="w-16 h-4 bg-white/10 rounded"></div>
            </div>
            <div className="w-20 h-8 bg-white/10 rounded mb-2"></div>
            <div className="w-24 h-4 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Track your content performance and audience insights</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Views"
              value={analytics.overview?.totalViews}
              icon={Eye}
              color="bg-blue-500"
              change={12.5}
            />
            <StatCard
              title="Total Likes"
              value={analytics.overview?.totalLikes}
              icon={Heart}
              color="bg-red-500"
              change={8.3}
            />
            <StatCard
              title="Comments"
              value={analytics.overview?.totalComments}
              icon={MessageCircle}
              color="bg-green-500"
              change={15.7}
            />
            <StatCard
              title="Shares"
              value={analytics.overview?.totalShares}
              icon={Share2}
              color="bg-purple-500"
              change={-2.1}
            />
            <StatCard
              title="Total Posts"
              value={analytics.overview?.totalPosts}
              icon={BookOpen}
              color="bg-yellow-500"
              change={5.2}
            />
            <StatCard
              title="Followers"
              value={analytics.overview?.totalFollowers}
              icon={Users}
              color="bg-indigo-500"
              change={18.9}
            />
            <StatCard
              title="Engagement Rate"
              value={analytics.overview?.engagementRate}
              icon={Target}
              color="bg-pink-500"
              change={3.4}
              isPercentage={true}
            />
            <StatCard
              title="Avg Read Time"
              value={analytics.overview?.avgReadTime}
              icon={Clock}
              color="bg-cyan-500"
              change={7.8}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Views Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Daily Views</h3>
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <BarChart data={analytics.viewsChart} />
            </motion.div>

            {/* Engagement Trends */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Engagement Trends</h3>
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <LineChart data={analytics.engagementChart} />
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Performing Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Top Performing Posts</h3>
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              
              <div className="space-y-4">
                {analytics.topPosts?.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-2">{post.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-400">
                        {post.engagementRate}%
                      </div>
                      <div className="text-xs text-slate-400">
                        Engagement Rate
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Audience & Traffic */}
            <div className="space-y-8">
              {/* Device Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Device Types</h3>
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <PieChart data={analytics.audienceData} />
              </motion.div>

              {/* Traffic Sources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <PieChart data={analytics.trafficSources} />
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
