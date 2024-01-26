import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const BooksDetails = () => {
  const id = useParams();
  const book = useSelector((state) => state.books.bookList);
  const user = useSelector((state) => state.users.user);
  const data = book.filter((item) => item._id == id.id)[0];

  return (
    <div className="min-h-[500px] border">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={data?.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {data?.category.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium my-4">
                {data?.title}
              </h1>
              <p className="font-bold leading-relaxed my-4 italic">
                {data?.author.name}
              </p>

              <p className="leading-relaxed">{data?.description}</p>
              <p className="font-bold text-xl leading-relaxed my-4 italic">
                ₹ {data?.price}
              </p>
              <p className="leading-relaxed mt-4">
                {data?.publication_year.split("T")[0]}
              </p>

              <div className=" mt-10 flex">
                {data.author._id == user._id ? (
                  <>
                    <button className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                      Edit
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BooksDetails;
