import { useState } from "react";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducer/userSlice";

const Header = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.users.isLoggedIn);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Books</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {isLogin ? (
            <>
              <Link className="mr-5 hover:text-gray-900" to="/my-books">
                My Books
              </Link>
              <Link className="mr-5 hover:text-gray-900" to="/add-book">
                Add Book
              </Link>
              <button
                className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white p-2 rounded-md"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="mr-5 hover:text-gray-900" to="/all-books">
                All Books
              </Link>
              <button
                onClick={() => setShowModal(!showModal)}
                className="text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white p-2 rounded-md"
              >
                Login
              </button>
            </>
          )}
        </nav>
      </div>
      {showModal && <Authentication setShowModal={setShowModal} />}
    </header>
  );
};

export default Header;
