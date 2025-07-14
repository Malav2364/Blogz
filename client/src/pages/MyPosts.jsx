import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar,
  Tag,
  Heart,
  MessageCircle,
  TrendingUp,
  Clock,
  BookOpen
} from "lucide-react";
import { toast } from "react-hot-toast";

// Mock data - replace with actual API calls
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    content: "A comprehensive guide to understanding and using React Hooks...",
    category: "Technology & Innovation",
    tags: ["react", "javascript", "hooks"],
    status: "published",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    views: 1250,
    likes: 89,
    comments: 23,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500"
  },
  {
    id: 2,
    title: "Modern CSS Techniques",
    content: "Exploring the latest CSS features and best practices...",
    category: "Technology & Innovation",
    tags: ["css", "web-design", "frontend"],
    status: "draft",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    views: 0,
    likes: 0,
    comments: 0,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
  },
  {
    id: 3,
    title: "The Future of Web Development",
    content: "Predictions and trends shaping the future of web development...",
    category: "Technology & Innovation",
    tags: ["webdev", "future", "trends"],
    status: "published",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-08",
    views: 2100,
    likes: 156,
    comments: 45,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"
  }
];

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        setTimeout(() => {
          setPosts(mockPosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterStatus === "all" || post.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "views":
          return b.views - a.views;
        case "likes":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const handleEdit = (postId) => {
    navigate(`/dashboard/edit-post/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // Replace with actual API call
        setPosts(posts.filter(post => post.id !== postId));
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete post");
      }
    }
  };

  const handleView = (postId) => {
    navigate(`/dashboard/blog/${postId}`);
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-500/20 text-green-400 border-green-500/30",
      draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      archived: "bg-gray-500/20 text-gray-400 border-gray-500/30"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Stories</h1>
          <p className="text-slate-400">Manage and track your published content</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/dashboard/create")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>New Story</span>
        </motion.button>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="views">Most Viewed</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center md:justify-end">
            <span className="text-slate-400 text-sm">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 animate-pulse">
              <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
              <div className="h-6 bg-white/10 rounded mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="flex space-x-2 mb-4">
                <div className="h-6 bg-white/10 rounded w-16"></div>
                <div className="h-6 bg-white/10 rounded w-16"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-white/10 rounded w-20"></div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-white/10 rounded"></div>
                  <div className="w-8 h-8 bg-white/10 rounded"></div>
                  <div className="w-8 h-8 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center"
        >
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Stories Found</h3>
          <p className="text-slate-400 mb-6">
            {searchTerm || filterStatus !== "all" 
              ? "No stories match your current filters." 
              : "You haven't created any stories yet."}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/dashboard/create")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Story</span>
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group"
            >
              {/* Cover Image */}
              {post.coverImage && (
                <div className="w-full h-48 bg-slate-700 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Post Details */}
              <div className="space-y-4">
                {/* Title and Status */}
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white leading-tight flex-1 mr-3">
                    {post.title}
                  </h3>
                  {getStatusBadge(post.status)}
                </div>

                {/* Content Preview */}
                <p className="text-slate-400 text-sm line-clamp-2">
                  {post.content}
                </p>

                {/* Category and Tags */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <Tag className="w-3 h-3 text-indigo-400" />
                    <span className="text-indigo-400">{post.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-slate-500/20 text-slate-400 rounded text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
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
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Updated {formatDate(post.updatedAt)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleView(post.id)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="View Post"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(post.id)}
                      className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                      title="Edit Post"
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
