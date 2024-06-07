import { Schema, model } from "mongoose";

const PaymentPdfSchema = new Schema(
  {
    pdf: { type: Schema.Types.ObjectId, ref: "LibraryPdf" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    checked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const PaymentPdf = model("PaymentPdf", PaymentPdfSchema);
export default PaymentPdf;
