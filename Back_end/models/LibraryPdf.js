import { Schema, model } from "mongoose";

const LibraryPdfSchema = new Schema(
  {
    pdf: { type: String, require: false },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const LibraryPdf = model("LibraryPdf", LibraryPdfSchema);
export default LibraryPdf;
