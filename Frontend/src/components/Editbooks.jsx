import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { IoClose } from "react-icons/io5";
const EditBook = ({ id, setShowModal }) => {
  // console.log(id);
  const [category, setCategory] = useState([]);
  const books = useSelector((state) => state.books.bookList);

  const getBook = books.filter((item) => item._id === id)[0];

  const SERVER_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  console.log(SERVER_URL);

  const [data, setData] = useState({
    title: getBook.title,
    description: getBook.description,
    image: getBook.image,
    price: getBook.price ? getBook.price : 0,
    category: getBook.category,
    publication_year: getBook.publication_year.split("T")[0],
  });

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/v1/categories`)
      .then((res) => {
        setCategory(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${SERVER_URL}/api/v1/books/${id}`, data)
      .then((res) => {
        toast.success("Successfully updated");
        setShowModal(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative">
        <IoClose
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setShowModal(false)}
        />
        <h3 className="text-2xl mb-4">Edit Book</h3>

        {/* <form className="flex flex-col gap-3" onSubmit={handleSubmit}> */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
              value={data.category._id}
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
              Update
            </button>
          </div>
        </form>
        {/* <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="border p-2 rounded-md"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            className="border p-2 rounded-md"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            className="border p-2 rounded-md"
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default EditBook;
