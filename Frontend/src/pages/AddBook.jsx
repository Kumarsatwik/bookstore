import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "../reducer/bookSlice";
import axios from "axios";
import toast from "react-hot-toast";
const AddBook = () => {
  const user = useSelector((state) => state.users.user);
  const books = useSelector((state) => state.books.bookList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    price: "",
    publication_year: "",
  });
  const SERVER_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/v1/categories`)
      .then((res) => {
        setCategory(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (user.length == 0) {
      console.log("user");
      navigate("/");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${SERVER_URL}/api/v1/books`,
        {
          title: data.title,
          description: data.description,
          image: data.image,
          category: data.category,
          price: data.price,
          publication_year: data.publication_year,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        const newBook = [...books, res.data];
        dispatch(addBook(newBook));
        toast.success("Successfully Added");
        navigate("/all-book");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-white">
      <div className="lg:min-h-screen ">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 ">
          <div className="max-w-xl lg:max-w-3xl">
            <h3 className="text-4xl font-semibold text-center text-yellow-500 mb-5">
              Add Book
            </h3>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 "
              onSubmit={handleSubmit}
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  className="w-full bg-white border p-2 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>

                <select
                  className="w-full bg-white border p-2 rounded-md"
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  id=""
                >
                  <option value="">Select Category</option>

                  {category.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Description"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Description{" "}
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  onChange={handleChange}
                  value={data.description}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm border p-2"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="publication_year"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {" "}
                  Publication Year{" "}
                </label>

                <input
                  type="date"
                  id="date"
                  name="publication_year"
                  onChange={handleChange}
                  value={data.publication_year}
                  className="mt-1 border-gray-200 text-sm text-gray-700 shadow-sm w-full bg-white border p-2 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price
                </label>

                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  value={data.price}
                  className="mt-1 border-gray-200 text-sm text-gray-700 shadow-sm w-full bg-white border p-2 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Image Link
                </label>

                <input
                  type="text"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  value={data.image}
                  className="mt-1 border-gray-200 text-sm text-gray-700 shadow-sm w-full bg-white border p-2 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-yellow-500 bg-yellow-500 px-12 py-3 text-sm font-medium text-white transition   hover:bg-yellow-600 focus:outline-none focus:ring active:text-yellow-500">
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AddBook;
