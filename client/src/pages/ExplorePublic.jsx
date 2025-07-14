import { useEffect, useState, useRef, useCallback } from "react";
import { getExplorePostsPublic } from "../services/exploreService";
import LoginPromptModal from "../components/LoginPromptModal";
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  ArrowLeft, 
  Clock, 
  Eye, 
  Heart, 
  User,
  Sparkles,
  TrendingUp,
  Calendar
} from "lucide-react";

const ExplorePublic = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("recent");
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");
  const [showFilters, setShowFilters] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const observer = useRef();

  const categories = [
    "Personal & Lifestyle",
    "Business & Career", 
    "Finance & Money",
    "Technology & Innovation",
    "Education & Learning",
    "Health & Wellness",
    "Travel & Culture",
    "Food & Drink",
    "Home & Living",
    "Art & Creativity",
    "Fashion & Beauty",
    "Entertainment & Pop Culture",
    "Sports & Fitness",
    "Politics & Society",
    "Science & Nature",
    "Philosophy & Spirituality",
    "DIY & How-To",
    "Family & Relationships",
    "Opinions & Commentary",
    "Hobbies & Niche Interests",
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent", icon: Clock },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
    { value: "oldest", label: "Oldest First", icon: Calendar },
  ];

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getExplorePostsPublic({
        page,
        search,
        category,
        sort,
      });
      
      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
      
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, sort, loading, hasMore]);

  const handleSearchChange = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
    setPosts([]);
    setHasMore(true);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handlePostClick = (postId) => {
    setRedirectPath(`/public-blog/${postId}`);
    setShowModal(true);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setPosts([]);
    setHasMore(true);
    setShowFilters(false);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
    setPosts([]);
    setHasMore(true);
    setShowFilters(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="inline-flex items-center text-slate-300 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <div className="w-px h-6 bg-slate-600"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Explore Stories</h1>
                  <p className="text-slate-400 text-sm">Discover amazing content from our community</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search stories, topics, authors..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </motion.button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sort Options */}
                <div>
                  <h3 className="text-white font-medium mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                          sort === option.value
                            ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                            : "text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <option.icon className="w-4 h-4" />
                        <span className="text-sm">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-white font-medium mb-3">Categories</h3>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleCategoryChange("")}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                        category === ""
                          ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                          : "text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      All Categories
                    </motion.button>
                    {categories.map((cat) => (
                      <motion.button
                        key={cat}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                          category === cat
                            ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                            : "text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {loading && posts.length === 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-6 animate-pulse">
                <div className="h-32 bg-white/20 rounded-lg mb-4"></div>
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="h-4 bg-white/20 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handlePostClick(post._id)}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 cursor-pointer hover:bg-white/15 transition-all duration-300 group"
              >
                {post.coverImage && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>

                  {post.category && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30">
                      {post.category}
                    </span>
                  )}

                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author?.name || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes?.length || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {loading && posts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-slate-400">You've reached the end of the stories!</p>
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No stories found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearch("");
                setCategory("");
                setSort("recent");
                setPage(1);
                setPosts([]);
                setHasMore(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all"
            >
              Reset Filters
            </motion.button>
          </div>
        )}
      </main>

      <LoginPromptModal
        showModal={showModal}
        setShowModal={setShowModal}
        redirectPath={redirectPath}
      />
    </div>
  );
};

export default ExplorePublic;
