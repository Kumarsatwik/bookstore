import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 ">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="ml-3 text-xl">
              <Link to="/>
                <p className="text-gray-500 text-xl font-bold">Book</p>
                </Link>
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
