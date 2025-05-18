import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import OrderData from './OrderData';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const data = await axios.get('https://goalgear.onrender.com/orders', {
        withCredentials: true,
      });
      console.log(data?.data?.data);
      setOrder(data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-7/12 mx-auto">
        {order && order.length === 0 ? (
          <div>
            <p className="text-4xl text-center mt-34 font-bold">No Orders </p>
            <div className="flex justify-between">
              <button
                className=" mx-auto text-center text-xl mx-auto py-1 px-3 bg-green-800 text-white mt-2 cursor-pointer rounded-lg"
                onClick={() => navigate('/')}
              >
                Go To Store
              </button>
            </div>
          </div>
        ) : (
          order.map((ele) => (
            <div key={ele._id}>
              {ele.items &&
                ele.items.map((data) => (
                  <OrderData key={data._id} date={ele.createdAt} data={data} />
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
