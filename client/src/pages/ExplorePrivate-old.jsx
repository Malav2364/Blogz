import { useEffect, useState, useRef, useCallback } from "react";
import { getExplorePostsPrivate } from "../services/exploreService";
import { toggleLikePost } from "../services/postService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import CommentSection from "../components/CommentSection";
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  User,
  Calendar,
  Clock,
  TrendingUp,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Share2
} from "lucide-react";

const ExplorePrivate = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("recent");
  const [expandedPostId, setExpandedPostId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [openCommentId, setOpenCommentId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
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

  const handleLike = async (postId) => {
    try {
      const result = await toggleLikePost(postId);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? {
                ...post,
                likes: result.isLiked
                  ? [...(post.likes || []), user._id]
                  : (post.likes || []).filter(id => id !== user._id),
                likesCount: result.likesCount
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error updating like:", error);
      toast.error("Failed to update like");
    }
  };

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getExplorePostsPrivate({
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
      toast.error("Failed to fetch posts");
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

  const toggleExpanded = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleAuthorClick = (authorId) => {
    navigate(`/author/${authorId}`);
  };

  const handleBlogClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  const isPostLiked = (post) => {
    return post.likes && post.likes.includes(user._id);
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Discover Stories</h1>
                <p className="text-slate-400 text-sm">Explore amazing content from our community</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to="/create-post"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Story</span>
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
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {loading && posts.length === 0 ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/20 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-white/20 rounded w-1/6"></div>
                  </div>
                </div>
                <div className="h-6 bg-white/20 rounded mb-3"></div>
                <div className="h-32 bg-white/20 rounded mb-4"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-8 bg-white/20 rounded w-16"></div>
                  <div className="h-8 bg-white/20 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleAuthorClick(post.author._id)}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{post.author.name}</h3>
                      <p className="text-slate-400 text-sm flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </p>
                    </div>
                  </div>

                  {post.category && (
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30">
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Post Content */}
                <div className="space-y-4">
                  <h2 
                    className="text-xl font-semibold text-white cursor-pointer hover:text-indigo-300 transition-colors"
                    onClick={() => handleBlogClick(post._id)}
                  >
                    {post.title}
                  </h2>

                  {post.coverImage && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  <div className="text-slate-300">
                    {expandedPostId === post._id ? (
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                      <p className="line-clamp-3">
                        {post.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                      </p>
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpanded(post._id)}
                    className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center space-x-1 transition-colors"
                  >
                    {expandedPostId === post._id ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Read More</span>
                      </>
                    )}
                  </button>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                          isPostLiked(post)
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isPostLiked(post) ? "fill-current" : ""}`} />
                        <span className="text-sm">{post.likesCount || 0}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOpenCommentId(openCommentId === post._id ? null : post._id)}
                        className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors px-3 py-2 rounded-lg hover:bg-blue-500/10"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments?.length || 0}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBlogClick(post._id)}
                        className="flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-colors px-3 py-2 rounded-lg hover:bg-green-500/10"
                      >
                        <Eye className="w-5 h-5" />
                        <span className="text-sm">View</span>
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-slate-400 hover:text-slate-300 transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Comments Section */}
                  {openCommentId === post._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <CommentSection postId={post._id} />
                    </motion.div>
                  )}
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
              <BookOpen className="w-12 h-12 text-white" />
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
    </div>
  );
};

export default ExplorePrivate;
