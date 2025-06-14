import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import OrderData from './OrderData';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `https://goalgear.onrender.com/orders?page=${currentPage}`,
        {
          withCredentials: true,
        }
      );

      const orderArr = res?.data?.data;
      setOrder((prev) => {
        const existingKeys = new Set(prev.map((o) => `${o.orderId}-${o._id}`));
        const filteredNewOrders = orderArr.filter(
          (o) => !existingKeys.has(`${o.orderId}-${o._id}`)
        );
        return [...prev, ...filteredNewOrders];
      });

      setTotalPage(res?.data?.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!searchMode) {
      fetchOrder();
    }
  }, [currentPage]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://goalgear.onrender.com/search/order?query=${search}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setOrder(res.data.orders);
      setTotalPage(res.data.totalPages);
      setCurrentPage(res.data.currentPage || 1);
      setSearchMode(true);
    } catch (err) {
      console.log(err);
    }
  };

  const resetSearch = () => {
    setSearch('');
    setOrder([]);
    setCurrentPage(1);
    setSearchMode(false);
  };

  return (
    <div>
      <Header />
      <div className="w-7/12 mx-auto">
        <div className="flex gap-4 justify-center my-5">
          <input
            type="search"
            placeholder="Search order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[480px] p-2 border border-gray-400 rounded-2xl"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white font-bold py-1 px-3 rounded-2xl"
          >
            Search
          </button>
          {searchMode && (
            <button
              onClick={resetSearch}
              className="bg-gray-700 text-white font-bold py-1 px-3 rounded-2xl"
            >
              Reset
            </button>
          )}
        </div>

        {order && order.length === 0 ? (
          <div>
            <p className="text-4xl text-center mt-34 font-bold">No Orders</p>
            <div className="flex justify-center">
              <button
                className="text-xl py-1 px-3 bg-green-800 text-white mt-2 rounded-lg"
                onClick={() => navigate('/')}
              >
                Go To Store
              </button>
            </div>
          </div>
        ) : (
          order.map((ele) => (
            <div key={ele._id}>
              <OrderData date={ele.orderCreatedAt} data={ele} />
            </div>
          ))
        )}
      </div>

      {!searchMode && totalPage > currentPage && (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="border py-1 px-3 rounded-2xl text-lg font-bold hover:bg-gray-500 hover:text-white"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
