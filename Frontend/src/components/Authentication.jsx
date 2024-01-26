import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { login } from "../reducer/userSlice";
const Authentication = ({ setShowModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setData({
      name: "",
      email: "",
      password: "",
    });
  }, [isLogin]);

  const SERVER_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${SERVER_URL}/api/v1/users/login`
      : `${SERVER_URL}/api/v1/users/register`;

    axios
      .post(url, data)
      .then((res) => {
        alert(res.data.message);
        if (!isLogin) {
          setIsLogin(true);
        } else {
          // console.log(res.data.user);
          dispatch(login(res.data.user));
          setShowModal(false);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-8 rounded-lg relative">
        <IoClose
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setShowModal(false)}
        />
        <h3 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h3>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label htmlFor="name">Name</label>
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
            </>
          )}

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
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <span
                className="underline cursor-pointer text-yellow-500"
                onClick={() => setIsLogin(!isLogin)}
              >
                Register here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="underline cursor-pointer text-yellow-500"
                onClick={() => setIsLogin(!isLogin)}
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
