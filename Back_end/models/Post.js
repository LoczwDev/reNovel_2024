import { Schema, model } from "mongoose";
import User from "./User";

const PostSchema = new Schema(
  {
    title: { type: String, default: "" },
    caption: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    body: { type: Object, require: true },
    photo: { type: String, require: false },
    pdf: { type: String, require: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: Schema.Types.ObjectId, ref: "Tags" },
    category: [{ type: Schema.Types.ObjectId, ref: "PostCategory" }],
    averageRating: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
    country: { type: String, default: "" },
    status: { type: String, default: "" },
    checked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

PostSchema.post("save", async function (doc) {
  try {
    // Lấy người dùng tạo bài đăng từ trường 'user'
    const user = await User.findById(doc.user);

    if (user && doc.checked) {
      // Tăng điểm của người dùng lên 100
      user.points += (doc.averageRating / 10) * doc.view;

      // Lưu người dùng đã cập nhật điểm
      await user.save();
    }
  } catch (error) {
    console.error("Error updating user points:", error);
  }
});

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

const Post = model("Post", PostSchema);
export default Post;
