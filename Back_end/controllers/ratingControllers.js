import Post from "../models/Post";
import Rating from "../models/Rating";

export const createRating = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { score } = req.body;

    // Kiểm tra xem người dùng đã đánh giá bài viết trước đó chưa
    let existingRating = await Rating.findOne({
      post: postId,
      user: req.user._id,
    });

    if (existingRating) {
      // Nếu người dùng đã đánh giá trước đó, cập nhật lại đánh giá của họ
      existingRating.score = score;
      await existingRating.save();
    } else {
      // Nếu người dùng chưa đánh giá trước đó, tạo một đánh giá mới
      existingRating = new Rating({
        score,
        user: req.user._id,
        post: postId,
      });
      await existingRating.save();
    }

    // Tính toán trung bình của các đánh giá cho bài viết
    const ratings = await Rating.find({ post: postId });
    const totalScores = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageRating = (totalScores / ratings.length).toFixed(1);

    // Cập nhật trường averageRating trong model Post
    await Post.findByIdAndUpdate(postId, { averageRating });

    res.status(201).json({ message: "Đánh giá đã được cập nhật thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi cập nhật đánh giá." });
  }
};

export const getRatingsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    // Lấy tất cả các đánh giá cho bài viết có postId
    const ratings = await Rating.find({ post: postId }).populate(
      "user",
      "name"
    );

    res.status(200).json(ratings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách đánh giá." });
  }
};
