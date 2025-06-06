import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import OrderData from './OrderData';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [order, setOrder] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const data = await axios.get(
        `https://goalgear.onrender.com/orders?page=${currentPage}`,
        {
          withCredentials: true,
        }
      );

      console.log(data?.data?.data);

      const orderArr = data?.data?.data;
      setOrder((prev) => {
  const existingKeys = new Set(prev.map((o) => `${o.orderId}-${o._id}`));

  const filteredNewOrders = orderArr.filter(
    (o) => !existingKeys.has(`${o.orderId}-${o._id}`)
  );

  return [...prev, ...filteredNewOrders];
});
      setTotalPage(data?.data?.totalPages);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    console.log(order);
    fetchOrder();
  }, [currentPage]);

  return (
    <div>
      <Header />
      <div className="w-7/12 mx-auto">
        {order && order.length === 0 ? (
          <div>
            <p className="text-4xl text-center mt-34 font-bold">No Orders </p>
            <div className="flex justify-between">
              <button
                className=" mx-auto text-center text-xl  py-1 px-3 bg-green-800 text-white mt-2 cursor-pointer rounded-lg"
                onClick={() => navigate('/')}
              >
                Go To Store
              </button>
            </div>
          </div>
        ) : (
          order.map((ele) => (
            <div key={ele._id}>
             
                  <OrderData key={ele._id} date={ele.
orderCreatedAt} data={ele} />
              
            </div>
          ))
        )}
      </div>
      {totalPage > currentPage && (
        <div className="flex justify-center mb-4">
          <button
            disabled={currentPage === totalPage}
            onClick={() => setcurrentPage((prev) => prev + 1)}
            className="border py-1 px-3 rounded-2xl text-lg font-bold hover:bg-gray-500 hover:text-white cursor-pointer"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
