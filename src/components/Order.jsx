import axios from 'axios';
import { useEffect, useState } from 'react';

const Order = () => {
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const data = await axios.get('https://goalgear.onrender.com/orders', {
        withCredentials: true,
      });
      console.log(data);
      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <h2>My Order</h2>
    </div>
  );
};

export default Order;
