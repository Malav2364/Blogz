import Post from "../models/blogmodel.js";
import Notification from "../models/notificationModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, tags, coverImage, category, status } = req.body;

    const imageUrls = [];
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(content))) {
      imageUrls.push(match[1]);
    }

    const post = await Post.create({
      title,
      content,
      tags,
      coverImage,
      imageGallery: imageUrls,
      category: category || "Uncategorized",
      status: status || "draft",
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate({
      path: "author",
      select: "name createdAt followers following",
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    const { title, content, tags, coverImage, category, status } = req.body;

    const imageUrls = [];
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(content))) {
      imageUrls.push(match[1]);
    }

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        tags,
        coverImage,
        imageGallery: imageUrls,
        category,
        status,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    const liked = post.likes.includes(userId);

    if (liked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);

      // Create notification only if not self-like
      if (post.author._id.toString() !== userId.toString()) {
        await Notification.create({
          recipient: post.author._id,
          sender: userId,
          type: "like",
          post: post._id,
          message: `${req.user.name} liked your blog post "${post.title}"`,
        });
      }
    }

    await post.save();
    res.json({ liked: !liked });
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).json({ message: "Error toggling like" });
  }
};
