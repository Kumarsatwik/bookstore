import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const TopBooks = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 w-[92%] mx-auto">
      <h2 className="text-3xl font-medium mb-5 ">New Books</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 ">
        {book.length > 0 &&
          book.map((item) => (
            <div
              className="flex gap-4 items-end max-w-[470px] p-3 rounded-md hover:shadow-lg"
              key={item?._id}
            >
              <div className="h-full  w-[50%]">
                <img
                  src={item?.image}
                  alt=""
                  className="rounded-md object-cover h-full w-full"
                />
              </div>
              <div className="flex flex-col gap-4">
                <section className="mb-7">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm font-light my-2">
                    {item?.description.slice(0, 30)}
                  </p>
                  <p className="font-semibold">₹ {item?.price}</p>
                </section>
                <button
                  className="text-white text-sm bg-yellow-500 p-2 w-fit rounded-md"
                  onClick={() => navigate(`/books-details/${item._id}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-end">
        <Link
          to="/all-books"
          className="rounded-md text-yellow-600 underline px-3 py-1 "
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default TopBooks;
