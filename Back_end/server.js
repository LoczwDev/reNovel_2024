import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errHanlder, invalidPathHandler } from "./middleware/erroHanlder.js";
import cors from "cors";

// Router
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
import commentRouter from "./router/commentRouter.js";
// import categoryRouter from "./router/categoryRouter.js";
import postCategoryRouter from "./router/categoryRouter.js";
import ratingRouter from "./router/ratingRouter.js";
import favoriteRouter from "./router/favoriteRouter.js";
import tagsRouter from "./router/tagsRouter.js";
import libraryPdfRouter from "./router/libraryPdfRouter.js";
import paymentPdfRouter from "./router/paymentPdfRouter.js";
const stripe = require("stripe")(
  "sk_test_51P4FXRGxvFMasAJGRImVaJ3jznjb4NNPdVySKhFZoPhh1vS2VX9x7rXYZQbfTn6mtn89SYjR4gpVwJixpHu9gBtx00fRoCygbV"
);
const YOUR_DOMAIN = "http://localhost:5173";

dotenv.config();
connectDB();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng middleware cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Da ket noi");
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/post-category", postCategoryRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/libraryPdf", libraryPdfRouter);
app.use("/api/payment", paymentPdfRouter);
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { price, pdfId, slug } = req.body;
    console.log("Received price:", price);


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "vnd",
            unit_amount: price * 1000,
            product_data: {
              name: "Số Tiền Thanh Toán Cho File Này",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success/${pdfId}/${slug}`,
      cancel_url: `${YOUR_DOMAIN}/canceled`,
    });

    res.redirect(session.url);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// staticapp.use("/api/favorites", favoriteRouter);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errHanlder);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Chạy trên cổng ${PORT}`));
