import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const navigate = useNavigate();
  return (
    <section className="px-10 grid grid-cols-1 md:grid-cols-2 items-center justify-between">
      <section className="order-2 md:order-1">
        <h3 className="text-4xl font-medium py-2">New Release This Week</h3>
        <p className="text-lg py-2">
          Its time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this weeks new releases offer something for
          everyone
        </p>
        <button
          className="mt-3 text-white bg-yellow-500 px-4 py-2 rounded"
          onClick={() => navigate(`/all-books`)}
        >
          View All
        </button>
      </section>
      <section className="flex order-1 md:order-2">
        <img src="/hero.png" className="" alt="" />
      </section>
    </section>
  );
};

export default Herosection;
