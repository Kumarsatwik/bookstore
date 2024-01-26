const bookModel = require("../models/book.model");
const userModel = require("../models/user.model");
const { validateBook } = require("../utils/validation");
// const { HttpException } = require("../utils/http.exception");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookModel
      .find({})
      .populate("author", "name")
      .populate("category", "name");
    return res.status(200).json({ books });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getById = async (req, res, next) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ book });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const createBook = async (req, res, next) => {
  try {
    const { title, category, description, price, publication_year, image } =
      req.body;

    const { error } = validateBook(req.body);

    if (error) {
      // next(new HttpException(400, error.details[0].message));
      return res.status(400).json({ message: error.details[0].message });
      // next(new throw(400, error.details[0].message));
      // throw new Error(400, error.details[0].message);
    }
    const author = await userModel.findById(req.user.id);

    const book = await bookModel.create({
      title,
      author: req.user.id,
      category,
      description,
      price,
      publication_year: new Date(publication_year),
      image,
    });
    // const book = [];
    return res.status(201).json({
      title: book.title,
      author: author.name,
      category: book.category,
      description: book.description,
      price: book.price,
      publication_year: book.publication_year,
      image: book.image,
    });
  } catch (err) {
    console.log(err);
    // throw new Error(400, "Something went wrong");
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      price,
      publication_year,
      description,
      image,
    } = req.body;
    const book = await bookModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        category,
        publication_year: new Date(publication_year),
        price,
        description,
        image,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ book });
  } catch (err) {
    console.log(err);
    // throw new Error(400, "Something went wrong");
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err);
    // throw new Error(400, "Something went wrong");
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { getAllBooks, getById, createBook, updateBook, deleteBook };
