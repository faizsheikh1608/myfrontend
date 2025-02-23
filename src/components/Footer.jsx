import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full  h-[300px] overflow-hidden bg-black text-white">
      <div className="w-4/12 mx-auto py-[80px]">
        <div className="flex gap-4 text-3xl w-full px-[30%] ">
          <Link to="https://www.linkedin.com/in/faiz-sheikh-815199209/">
            <i className="bi bi-facebook cursor-pointer text-white"></i>
          </Link>
          <Link to="https://www.linkedin.com/in/faiz-sheikh-815199209/">
            <i className="bi bi-linkedin cursor-pointer text-white"></i>
          </Link>
          <Link to="https://www.linkedin.com/in/faiz-sheikh-815199209/">
            <i className="bi bi-instagram cursor-pointer text-white"></i>
          </Link>
          <Link to="https://www.linkedin.com/in/faiz-sheikh-815199209/">
            <i className="bi bi-twitter-x cursor-pointer text-white"></i>
          </Link>
        </div>
        <div className="flex gap-5 mt-3 px-[15%] text-lg">
          <Link to="/Contact">
            <p className="hover:text-gray-500">Contact Us</p>
          </Link>
          <Link to="/terms">
            <p className="hover:text-gray-500">Terms and Conditions</p>
          </Link>
        </div>
        <div className="flex gap-5 mt-1 px-[16%] text-lg">
          <Link to="/refund">
            <p className="hover:text-gray-500">Refund Policy</p>
          </Link>
          <Link to="/cancel">
            <p className="hover:text-gray-500">Cancellation Policy</p>
          </Link>
        </div>
        <div className="mt-1 px-[12%]">
          <p className="text-gray-400 text-lg">
            © 2025 GOALGEAR. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
