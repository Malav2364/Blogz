import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiEye, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import { getAllPosts, toggleLikePost } from '../services/postService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts();
      setPosts(response.data || []);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    try {
      const response = await toggleLikePost(postId);
      
      // Update the post in the state
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post._id === postId) {
            const updatedPost = { ...post };
            if (response.data.liked) {
              updatedPost.likes = [...(updatedPost.likes || []), user._id];
            } else {
              updatedPost.likes = (updatedPost.likes || []).filter(id => id !== user._id);
            }
            return updatedPost;
          }
          return post;
        })
      );
    } catch (err) {
      console.error('Error toggling like:', err);
      alert('Failed to toggle like. Please try again.');
    }
  };

  const isLiked = (post) => {
    return user && post.likes && post.likes.includes(user._id);
  };

  const filteredPosts = posts.filter(post => {
    if (!post || !post.title) return false;
    
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.tags && post.tags.some(tag => tag && tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'published') return matchesSearch && post.status === 'published';
    if (filter === 'draft') return matchesSearch && post.status === 'draft';
    return matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    try {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    } catch {
      return html;
    }
  };

  const truncateText = (text, maxLength = 150) => {
    const plainText = stripHtml(text);
    return plainText.length > maxLength ? `${plainText.substring(0, maxLength)}...` : plainText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Discover Amazing Stories
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore a world of creativity and inspiration from our community of writers
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search posts by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'published', 'draft'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    filter === filterOption
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6 text-red-300 text-center"
          >
            {error}
          </motion.div>
        )}

        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-2xl text-gray-300 mb-2">No posts found</h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'Be the first to create a post!'}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/dashboard/blog/${post._id}`)}
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {post.status === 'draft' && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-500/90 text-yellow-900 px-2 py-1 rounded-lg text-xs font-semibold">
                          Draft
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="bg-purple-500/90 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        {post.category || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {post.title}
                  </h3>

                  {/* Author and Date */}
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      <span>{post.author?.name || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <p className="text-gray-300 text-sm mb-4 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {truncateText(post.content)}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <FiTag className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-gray-400 text-xs">+{post.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post._id);
                        }}
                        className={`flex items-center gap-1 transition-colors duration-300 ${
                          isLiked(post)
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <FiHeart className={`w-4 h-4 ${isLiked(post) ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likes?.length || 0}</span>
                      </button>
                      <div className="flex items-center gap-1 text-gray-400">
                        <FiMessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <FiEye className="w-4 h-4" />
                        <span className="text-sm">{post.views || 0}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/blog/${post._id}`);
                      }}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
