import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, uploadPostImage } from "../services/postService";
import RichTextEditor from "../components/RichTextEditor";
import { toast } from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  Tag,
  Type,
  Layers,
  Sparkles,
  FileText,
  ChevronDown,
  X,
  Check
} from "lucide-react";

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

const CreatePost = () => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverWidth] = useState("100%");
  const [coverHeight] = useState("auto");
  const [category, setCategory] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const result = await uploadPostImage(file);
      setCoverImage(result.url); // Fixed: use 'url' instead of 'imageUrl'
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleCategorySearch = (e) => {
    const searchTerm = e.target.value;
    setCategory(searchTerm);
    const filtered = categories.filter(cat =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setShowDropdown(true);
  };

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowDropdown(false);
    setFilteredCategories(categories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add some content");
      return;
    }

    setIsSubmitting(true);
    try {
      const postData = {
        title: title.trim(),
        content,
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        category: category || undefined,
        coverImage: coverImage || undefined,
        coverWidth,
        coverHeight,
      };

      await createPost(postData);
      toast.success("Post created successfully!");
      navigate("/dashboard/explore");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
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
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Create New Story</h1>
                  <p className="text-slate-400 text-sm">Share your thoughts with the world</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePreview}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors flex items-center space-x-2 rounded-lg hover:bg-white/10"
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Publish</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {showPreview ? (
          /* Preview Mode */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8"
          >
            <div className="space-y-6">
              {coverImage && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              
              <div>
                <h1 className="text-3xl font-bold text-white mb-4">{title || "Untitled"}</h1>
                {category && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30 mb-4">
                    {category}
                  </span>
                )}
                <div 
                  className="text-slate-300 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Type className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">Story Title</h2>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story title..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-xl font-medium"
              />
            </motion.div>

            {/* Cover Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <ImageIcon className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">Cover Image</h2>
              </div>
              
              {coverImage ? (
                <div className="space-y-4">
                  <div className="relative group">
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="p-2 bg-red-500 text-white rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-slate-300 mb-4">Upload a cover image for your story</p>
                  <label className="cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Choose Image</span>
                        </>
                      )}
                    </motion.div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              )}
            </motion.div>

            {/* Category and Tags Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Category */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-semibold text-white">Category</h2>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={category}
                    onChange={handleCategorySearch}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Select or search category..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-20 w-full mt-2 bg-slate-800 border border-white/20 rounded-xl shadow-2xl max-h-48 overflow-y-auto"
                    >
                      {filteredCategories.map((cat) => (
                        <motion.button
                          key={cat}
                          type="button"
                          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                          onClick={() => selectCategory(cat)}
                          className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 flex items-center justify-between"
                        >
                          <span>{cat}</span>
                          {category === cat && <Check className="w-4 h-4 text-green-400" />}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Tag className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-semibold text-white">Tags</h2>
                </div>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags separated by commas..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="text-slate-400 text-sm mt-2">Use commas to separate tags (e.g., react, javascript, tutorial)</p>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">Story Content</h2>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your story..."
                />
              </div>
            </motion.div>
          </form>
        )}
      </main>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default CreatePost;
