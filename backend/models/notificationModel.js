import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // ✅ allow null sender for admin/system actions
    },
    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "follow",
        "admin_post_deleted",
        "admin_comment_deleted",
        "admin_deleted_comment_on_post",
        "ban_notice",
        "unban_notice",
      ],
      required: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    message: { type: String },
    read: { type: Boolean, default: false }, // ✅ optional future use
  },
  {
    timestamps: true,
  }
);

// Create TTL index to auto-delete notifications after 7 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

export default mongoose.model("Notification", notificationSchema);
