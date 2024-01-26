import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AllBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.bookList);
  const navigate = useNavigate();

  return (
    <section className="text-gray-600 body-font">
      <h2 className="text-3xl font-medium mb-5 text-center text-yellow-500  ">
        All Books
      </h2>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 gap-5">
          {books.map((item) => (
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full border" key={item?.id}>
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-contain object-center w-full h-full block"
                  src={item?.image}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {item?.category.name}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {item?.title}
                </h2>
                <p className="mt-1 italic">₹ {item?.price}</p>
                <p className="mt-1 font-semibold">{item?.author.name}</p>
                <button
                  className="text-white text-sm bg-yellow-500 p-2 w-fit rounded-md mt-5"
                  onClick={() => navigate(`/books-details/${item._id}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
