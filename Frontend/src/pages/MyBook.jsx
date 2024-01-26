import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addBook, deleteBook } from "../reducer/bookSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import EditBook from "../components/Editbooks";
import toast from "react-hot-toast";

const MyBook = () => {
  const books = useSelector((state) => state.books.bookList);
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const data = books.filter((item) => item?.author?._id === user.id);

  const SERVER_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (user.length === 0) {
      console.log("user");
      navigate("/");
    }
  }, [user]);

  const handleEdit = (id) => {
    setSelectedBookId(id);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    axios
      .delete(`${SERVER_URL}/api/v1/books/${id}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("deleted successfully");
        // const updateBook = books.filter((item) => item._id !== id);
        dispatch(deleteBook(id));
        toast.success("Successfully Deleted");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <section className="w-[92%] min-h-[400px] p-5 mx-auto">
        <h3 className="text-3xl my-5 text-center text-yellow-500">My Books</h3>

        {data.length === 0 && (
          <p className="text-xl text-center italic mt-10">
            No Books Available....
          </p>
        )}

        {data.length > 0 &&
          data.map((item) => (
            <div
              className="flex items-center justify-between h-1/6 w-full px-5 border py-2 mb-3 rounded-md"
              key={item?._id}
            >
              <div className="w-20 h-full">
                <img
                  src={item?.image}
                  alt=""
                  className="w-full h-full object-contain rounded-md"
                />
              </div>

              <div>
                <p className="text-lg flex-1">{item?.title}</p>
                <p className="text-medium text-center flex-1 italic">
                  ₹ {item?.price}
                </p>
              </div>

              <span className="flex gap-5">
                <MdDeleteOutline
                  className="w-10 h-6 cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
                <FaRegEdit
                  className="w-10 h-5 cursor-pointer"
                  onClick={() => handleEdit(item._id)}
                />
              </span>
            </div>
          ))}
      </section>
      {showModal && (
        <EditBook setShowModal={setShowModal} id={selectedBookId} />
      )}
    </>
  );
};

export default MyBook;
