import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShimmerUI from './ShimmerUI';

const Items = (props) => {
  console.log(props);
  const { item, setTotal, removeItem } = props;
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/product/${item.productId}`,
        { withCredentials: true }
      );
      setData(res.data.product);
      setTotal(
        (prevTotal) => prevTotal + res.data.product.price * item.quantity
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [item.productId]);

  //Handle Remove Item
  

  if (!data) {
    return <ShimmerUI/>;
  }

  return (
    <div className="flex relative gap-7 ml-[50px] mt-[40px] border w-full h-[250px] rounded-xl overflow-hidden object-cover shadow-lg">
      <div className="h-full w-4/12  ">
        <img
          src={data.color[0].mainImageUrl}
          alt="Product"
          className="w-full h-full object-cover object-fill"
        ></img>
      </div>
      <div className="mt-4 ">
        <h2 className="text-xl font-semibold">{data.productName}</h2>
        <p className="mt-2 text-lg font-medium text-gray-500 ">
          Ships with in a few days!
        </p>

        <p className="text-lg font-semibold mt-3">Size : {item.size} </p>
        <p className="text-lg font-semibold">Quantity : {item.quantity}</p>

        <p className="text-lg mt-5 font-semibold">Price : ₹ {data.price}</p>
      </div>
      <div
        onClick={() => {
          setTotal(
            (prevTotal) => prevTotal - (data.price * item.quantity)
          );
          return removeItem(item.productId);
        }}
      >
        <i className="bi bi-x-lg absolute right-4 top-3 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default Items;
