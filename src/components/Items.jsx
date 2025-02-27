import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShimmerUI from './ShimmerUI';
import { useDispatch } from 'react-redux';
import { addTotal } from '../utils/totalSlice';

const Items = ({ item, setTotal, removeItem }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://goalgear.onrender.com/product/${item.productId}`,
          { withCredentials: true }
        );
        setData(res.data.product);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [item.productId]);

  useEffect(() => {
    if (data) {
      const itemTotal = data.price * item.quantity;
      setTotal((prevTotal) => prevTotal + itemTotal);
      dispatch(addTotal(itemTotal));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleRemoveItem = () => {
    if (data) {
      const itemTotal = data.price * item.quantity;
      setTotal((prevTotal) => prevTotal - itemTotal);
      dispatch(addTotal(-itemTotal)); // Reduce total in Redux
    }
    removeItem(item.productId);
  };

  if (!data) {
    return <ShimmerUI />;
  }

  return (
    <div className="flex relative gap-7 ml-[50px] mt-[40px] border w-full h-[250px] rounded-xl overflow-hidden object-cover shadow-lg">
      <div className="h-full w-4/12">
        <img
          src={data.color[0].mainImageUrl}
          alt="Product"
          className="w-full h-full object-cover object-fill"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{data.productName}</h2>
        <p className="mt-2 text-lg font-medium text-gray-500">
          Ships within a few days!
        </p>
        <p className="text-lg font-semibold mt-3">Size: {item.size}</p>
        <p className="text-lg font-semibold">Quantity: {item.quantity}</p>
        <p className="text-lg mt-5 font-semibold">Price: ₹ {data.price}</p>
      </div>
      <div onClick={handleRemoveItem}>
        <i className="bi bi-x-lg absolute right-4 top-3 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default Items;
