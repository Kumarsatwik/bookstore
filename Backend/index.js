const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const app = express();
dotenv.config();

const db = require("./config/db");

const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");

const { errorHandler } = require("./middleware/error.middleware");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/books", bookRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
