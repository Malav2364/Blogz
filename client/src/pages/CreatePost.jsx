import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, uploadPostImage } from "../services/postService";
import RichTextEditor from "../components/RichTextEditor";
import { toast } from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  Tag,
  Type,
  Layers,
  Sparkles,
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
  "Hobbies & Niche Interests"
];

const CreatePost = () => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const result = await uploadPostImage(file);
      setCoverImage(result.url);
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
        category: category || "Uncategorized",
        coverImage: coverImage || "",
        status: "published",
      };

      await createPost(postData);
      toast.success("Post created successfully!");
      navigate("/dashboard/explore");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Create New Story</h1>
          <p className="text-slate-400">Share your thoughts with the world</p>
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
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center space-x-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish'}</span>
          </motion.button>
        </div>
      </div>

      {!showPreview ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Type className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">Story Title</h3>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title for your story..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </motion.div>

            {/* Content Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Layers className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">Content</h3>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Cover Image */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ImageIcon className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">Cover Image</h3>
              </div>
              
              <p className="text-slate-300 mb-3">Upload a cover image for your story</p>
              
              {coverImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-xl overflow-hidden mb-4"
                >
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCoverImage("")}
                      className="p-2 bg-red-500 text-white rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors"
                >
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 mb-4">Click to upload cover image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors"
                  >
                    {uploading ? "Uploading..." : "Choose Image"}
                  </label>
                </motion.div>
              )}
            </div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Layers className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">Category</h3>
              </div>
              
              <div className="relative" ref={dropdownRef}>
                <input
                  type="text"
                  value={category}
                  onChange={handleCategorySearch}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search or select category..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl max-h-48 overflow-y-auto z-50"
                  >
                    {filteredCategories.map((cat, index) => (
                      <motion.button
                        key={cat}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => selectCategory(cat)}
                        className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Tag className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">Tags</h3>
              </div>
              
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-400 mt-2">e.g. travel, food, lifestyle</p>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">{title || "Untitled"}</h2>
          <div 
            className="prose prose-invert max-w-none text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CreatePost;
