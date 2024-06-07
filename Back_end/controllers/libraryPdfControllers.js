import LibraryPdf from "../models/LibraryPdf";
import fileRemovePDF from "../utils/fileRemovePDF";

export const createLibraryPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Không tìm thấy file" });
    }
    const { postId } = req.params;
    const { filename } = req.file;

    let existingPdf = await LibraryPdf.findOne({ post: postId });

    if (existingPdf) {
      fileRemovePDF(existingPdf.pdf);
      existingPdf.pdf = filename;
      await existingPdf.save();
    } else {
      existingPdf = new LibraryPdf({
        pdf: filename,
        post: postId,
        user: req.user,
      });
      await existingPdf.save();
    }

    res.status(200).json({ message: "Thêm file dịch thuật thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getLibraryPdf = async (req, res) => {
  try {
    const { postId } = req.params;

    const libraryPdf = await LibraryPdf.findOne({ post: postId });

    // if (!libraryPdf) {
    //   // return res.status(404).json({ error: "Không tìm thấy dữ liệu" });
    //   return;
    // }

    res.status(200).json(libraryPdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
