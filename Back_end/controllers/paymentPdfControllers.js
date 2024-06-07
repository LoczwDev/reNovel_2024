import PaymentPdf from "../models/PaymentPdf";

export const paymentSuccess = async (req, res, next) => {
  try {
    const { pdfId } = req.body;
    const paymentPdf = new PaymentPdf({
      pdf: pdfId,
      user: req.user._id,
      checked: true,
    });

    await paymentPdf.save();

    res.status(200).json(paymentPdf);
  } catch (error) {
    next(error);
  }
};
export const getPaymentPdfById = async (req, res, next) => {
  try {
    const { pdfId } = req.params;
    const userId = req.user._id;
    const paymentPdf = await PaymentPdf.findOne({
      pdf: pdfId ? pdfId : "",
      user: userId,
    });
    if (!paymentPdf) {
      return res.status(404).end();
    }

    res.status(200).json(paymentPdf);
  } catch (error) {
    next(error);
  }
};
export const getAlllPayment = async (req, res, next) => {
  try {
    const paymentPdf = await PaymentPdf.find({});

    if (!paymentPdf) {
      return res.status(404).json({ message: "Không có dữ liệu" });
    }

    res.status(200).json(paymentPdf);
  } catch (error) {
    next(error);
  }
};
