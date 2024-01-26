import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 ">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="ml-3 text-xl">
              <img
                src="https://www.figma.com/file/Cs9CkR0rPFVSmUpVZFTZXo/image/45895a848aabf1bdde6f35265ff40fb98689a2d3"
                alt=""
                className=" object-cover h-[100px] w-[100px]"
              />
            </span>
          </Link>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">About</a>
            <a className="ml-3 text-gray-500">Features</a>
            <a className="ml-3 text-gray-500">Pricing</a>
            <a className="ml-3 text-gray-500">Gallery</a>
            <a className="ml-3 text-gray-500">Team</a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
