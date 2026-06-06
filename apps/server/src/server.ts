import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import morgan from "morgan";
import { ok } from "./utils/envelope";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorhandler";
import { clerkMiddleware } from "@clerk/express";
import { authRouter } from "./routes/auth/auth.routes";
import { adminDashboardRouter } from "./routes/admin/dashboard.routes";
import { productRouter } from "./routes/admin/product.routes";
import { adminPromoRouter } from "./routes/admin/promo.routes";
import { adminSettingsRouter } from "./routes/admin/setting.routes";
import { adminOrderRouter } from "./routes/admin/orders.routes";
import { customerAddressRouter } from "./routes/customer/address.routes";
import { customerCartWishlistRouter } from "./routes/customer/cartWishlist.routes";
import { customerCheckoutRouter } from "./routes/customer/checkout.routes";
import { customerCheckoutWithPointsRouter } from "./routes/customer/checkoutWithPoints.routes";
import { customerHomeRouter } from "./routes/customer/home.routes";
import { customerOrderRouter } from "./routes/customer/orders.routes";
import { customerProductRouter } from "./routes/customer/product.routes";
import { customerPromoRouter } from "./routes/customer/promo.routes";
import chatBotRouter from "./routes/chatbot.route";
import { customerReviewRouter } from "./routes/customer/review.routes";

const app = express();
const PORT = process.env.PORT || 8080;
const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
  ?.split(",")
  ?.map((origin: string) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/customer", customerHomeRouter);
app.use("/customer", customerProductRouter);
app.use("/customer", customerReviewRouter);
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json(
    ok({
      message: "Server is healthy \n running state",
    }),
  );
});

// auth route
app.use("/auth", authRouter);

// admin route
app.use("/admin", adminDashboardRouter);
app.use("/admin", productRouter);
app.use("/admin", adminPromoRouter);
app.use("/admin", adminSettingsRouter);
app.use("/admin", adminOrderRouter);

// customer route
app.use("/customer", customerAddressRouter);
app.use("/customer", customerCartWishlistRouter);
app.use("/customer", customerCheckoutRouter);
app.use("/customer", customerCheckoutWithPointsRouter);
app.use("/customer", customerOrderRouter);
app.use("/customer", customerPromoRouter);

// chat bot
app.use("/chatbot", chatBotRouter);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server running on port:", PORT);
    });
  } catch (err) {
    console.error("failed to start", err);
    process.exit(1);
  }
}

startServer();
