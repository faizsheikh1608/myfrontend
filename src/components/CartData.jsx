import { useEffect, useState } from 'react';
import Items from './Items';
import axios from 'axios';
import ShimmerUI from './ShimmerUI';
import { useNavigate } from 'react-router-dom';

const CartData = () => {
  const [data, setData] = useState(null);
  const [total,setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/cart/getItems', {
        withCredentials: true,
      });

      console.log(res.data.items);
      setData(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeItem = async (productId) => {
    try {
      // Optimistically remove the item from the UI
      const updatedItems = data.filter((item) => item.productId !== productId);
      setData(updatedItems);
      


     

      // Send the delete request to the server
      await axios.delete(`http://localhost:3000/cart/removeItem/${productId}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
      fetchData(); 
    }
  };

  if(!data){
    return <ShimmerUI/>
  }

  return (
    <div className="flex justify-evenly gap-8  p-6">
      <div id="items" className="w-[700px]">
        {data.map((items) => {
         
          return <Items key={items._id} item={items} setTotal={setTotal} removeItem={removeItem}/>;
        })}
      </div>
      <div
        id="total"
        className="border h-[240px] mt-[40px] p-4 rounded-lg shadow-lg w-[350px]"
      >
        <p className="text-xl font-semibold">PRICE SUMMARY</p>
        <div className="flex justify-between mt-3">
          <p className="text-gray-600 text-md">Total MRP (Incl. of taxes)</p>
          <p className="text-gray-600 text-md">₹{total}</p>
        </div>
        <div className="flex justify-between mt-1 mb-2">
          <p className="text-gray-600 text-md">Delivery Fee</p>
          <p className="text-green-600 text-lg font-semibold">Free</p>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-gray-500 border-dashed">
          <p className="text-black text-lg font-semibold">Subtotal</p>
          <p className="text-black text-lg font-semibold">₹{total}</p>
        </div>
        <div onClick={() => navigate('/address')} className="text-white bg-green-600 text-center rounded-lg py-1 mt-3 cursor-pointer  text-lg font-semibold">
          PROCEED
        </div>
      </div>
    </div>
  );
};

export default CartData;
