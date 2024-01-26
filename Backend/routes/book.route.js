const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

const { verifyToken } = require("../middleware/authenticated.middleware");

router.get("/", getAllBooks);
router.post("/", verifyToken, createBook);
router.get("/:id", getById);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

module.exports = router;
