import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { removeUsers, addUser } from '../utils/userSlice';
import {
  setcurrentPage,
  setData,
  setIsSearching,
  setTotalPage,
} from '../utils/productSlice';

const Header = () => {
  //const user = useSelector((store) => store.user);
  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://goalgear.onrender.com/logout',
        {},
        { withCredentials: true }
      );

      localStorage.removeItem('token');
      dispatch(removeUsers());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  //handel Search
  const handleSearch = async () => {
    if (!searchText.trim()) return;
    const data = await axios.get(
      `https://goalgear.onrender.com/search/product?query=${searchText}`,
      {
        withCredentials: true,
      }
    );

    console.log(data?.data);

    dispatch(setData(data.data.products));
    dispatch(setIsSearching(true));
    dispatch(setTotalPage(data?.data?.totalPages));
    dispatch(setcurrentPage(data?.data?.currentPage));

    setSearchText('');
    navigate('/');
  };
  useEffect(() => {
    dispatch(addUser(localStorage.getItem('token')));
  }, []);

  return (
    <div className="h-[100px]  w-full flex justify-between items-center p-0 m-0 shadow-lg">
      <div
        className="w-[400px]  flex justify-start items-center relative p-0 m-0 cursor-pointer"
        onClick={() => {
          navigate('/');
          dispatch(setIsSearching(false));
        }}
      >
        <img
          className="w-[280px] h-full  object-cover"
          src="/images/White.png"
          alt="Logo"
        ></img>
      </div>
      <div id="Search-div" className="w-6/12 flex items-center outline-none">
        <input
          type="search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-10/12 border-[1px] rounded-l-2xl p-2 pl-4 outline-none text-base border-gray-200 border-r-0"
        ></input>
        <div onClick={handleSearch}>
          <i className="bi bi-search bg-gray-100 text-2xl py-[6px] px-5 rounded-r-2xl cursor-pointer"></i>
        </div>
      </div>
      <div className="pr-[10px] flex gap-2 items-center">
        <div
          onClick={() => (user ? navigate('/cart') : navigate('/login'))}
          className="bg-green-600 py-[6px] px-5 text-xl rounded-2xl cursor-pointer text-white"
        >
          Cart <i className="bi bi-cart4 "></i>
        </div>
        {user ? (
          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <i className="bi bi-person-circle text-[32px] px-5 cursor-pointer"></i>
            {isOpen && (
              <ul className="absolute top-10 right-0 mt-1  w-40 bg-white text-black rounded-lg shadow-lg">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 hover:rounded-b-lg cursor-pointer"
                  onClick={() => navigate('/order')}
                >
                  Order
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login">
            <div className="bg-green-600 py-[6px] px-5 text-xl rounded-2xl cursor-pointer text-white">
              Login{' '}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
