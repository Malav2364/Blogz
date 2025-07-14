import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, toggleLikePost } from "../services/postService";
import CommentSection from "../components/CommentSection";
import { useSelector } from "react-redux";
import { toggleFollowUser } from "../services/followService";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  User, 
  Calendar, 
  Clock,
  Eye,
  UserPlus,
  UserMinus,
  ExternalLink,
  Bookmark,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
        if (user && data.likes.includes(user._id)) {
          setLiked(true);
        }
        if (user && data.author?.followers?.includes(user._id)) {
          setIsFollowing(true);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, user]);

  const handleFollow = async () => {
    if (!user) return toast.error("Please login to follow!");
    try {
      const res = await toggleFollowUser(post.author._id);
      setIsFollowing(res.following);
      toast.success(res.following ? "Followed" : "Unfollowed");
    } catch (err) {
      console.error("Follow error:", err);
      toast.error("Action failed");
    }
  };

  const handleLike = async () => {
    if (!user) return toast.error("Please login to like!");
    try {
      const result = await toggleLikePost(id);
      setLiked(!liked);
      setPost(prev => ({
        ...prev,
        likes: result.isLiked
          ? [...prev.likes, user._id]
          : prev.likes.filter(userId => userId !== user._id),
        likesCount: result.likesCount
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like");
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || "Check out this story";
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isAuthor = user && post && user._id === post.author._id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <Helmet>
        <title>{post.title} - WriteWave</title>
        <meta name="description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 155)} />
      </Helmet>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </motion.button>

            {isAuthor && (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/edit-post/${post._id}`)}
                  className="p-2 text-slate-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-white/10"
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-slate-300 hover:text-red-400 transition-colors rounded-lg hover:bg-white/10"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <article className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Category */}
            {post.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30">
                  {post.category}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-white mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Author Info & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-8 pb-6 border-b border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => navigate(`/author/${post.author._id}`)}
                >
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-white font-medium cursor-pointer hover:text-indigo-300 transition-colors"
                    onClick={() => navigate(`/author/${post.author._id}`)}
                  >
                    {post.author.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{Math.ceil(post.content.replace(/<[^>]*>/g, '').length / 200)} min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {user && !isAuthor && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFollow}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isFollowing
                      ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                      : "bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="w-4 h-4" />
                      <span>Unfollow</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 text-slate-300 text-sm rounded-full border border-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between pt-6 border-t border-white/10"
            >
              <div className="flex items-center space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    liked
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                  <span>{post.likesCount || post.likes?.length || 0}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-blue-500/10"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments?.length || 0}</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-colors px-4 py-2 rounded-lg hover:bg-green-500/10"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </motion.button>

                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-full mb-2 left-0 bg-slate-800 border border-white/20 rounded-xl p-3 shadow-2xl min-w-48"
                    >
                      <div className="space-y-2">
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-blue-600 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-blue-500 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </button>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-green-500 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </button>
                        <hr className="border-white/20" />
                        <button
                          onClick={copyToClipboard}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-indigo-400 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>Copy Link</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </article>

        {/* Comments Section */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Comments</h3>
              <CommentSection postId={post._id} />
            </div>
          </motion.div>
        )}
      </main>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default BlogDetail;
