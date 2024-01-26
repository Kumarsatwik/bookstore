import { useEffect, useState } from "react";
import TopBooks from "../components/TopBooks";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addBook } from "../reducer/bookSlice";

const Home = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.bookList);

  const SERVER_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  // console.log(books);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${SERVER_URL}/api/v1/books`)
        .then((res) => {
          // console.log(res);
          dispatch(addBook(res.data.books));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <section className="">
      <TopBooks book={books.slice(0, 6)} />
    </section>
  );
};

export default Home;
