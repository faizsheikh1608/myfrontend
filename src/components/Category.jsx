import { useDispatch } from 'react-redux';

import axios from 'axios';
import { setData } from '../utils/productSlice';

const Category = () => {
  const dispatch = useDispatch();

  //handel All
  const handleAll = async () => {
    try {
      const res = await axios.get('http://localhost:3000/allProducts', {
        withCredentials: true,
      });
      dispatch(setData(res.data.product));
    } catch (err) {
      console.log(err);
    }
  };

  //handle category
  const handlecategory = async (category) => {
    try {
      const res = await axios.get(
        `https://goalgear.onrender.com/filter/product?category=${category}`,
        { withCredentials: true }
      );
      console.log(res.data.product);
      dispatch(setData(res.data.product));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-evenly mt-8">
      <div className="cursor-pointer flex flex-col gap-3" onClick={handleAll}>
        <div className="w-24  rounded-full shadow-lg overflow-hidden ">
          <img src="/images/all.png" alt="All" className="object-cover "></img>
        </div>
        <h3 className="text-center ">ALL</h3>
      </div>
      <div
        className="cursor-pointer  flex flex-col gap-3"
        onClick={() => handlecategory('Shoes')}
      >
        <div className="w-24  rounded-full shadow-lg overflow-hidden">
          <img
            src="/images/shoes.png"
            alt="Shoes"
            className="object-cover "
          ></img>
        </div>
        <h3 className="text-center ">SHOES</h3>
      </div>
      <div className="cursor-pointer  flex flex-col gap-[19px]">
        <div
          className="w-24  rounded-full shadow-lg overflow-hidden"
          onClick={() => handlecategory('Shorts')}
        >
          <img
            src="/images/shorts.png"
            alt="Shorts"
            className="object-cover w-[80px] py-3 pl-5"
          ></img>
        </div>
        <h3 className="text-center ">SHORTS</h3>
      </div>
      <div className="cursor-pointer  flex flex-col gap-3">
        <div
          className="w-24  rounded-full shadow-lg overflow-hidden"
          onClick={() => handlecategory('T-Shirts')}
        >
          <img
            src="/images/t-shirts.png"
            alt="T-shirts"
            className="object-cover"
          ></img>
        </div>
        <h3 className="text-center ">T-SHIRTS</h3>
      </div>
      <div
        className="cursor-pointer  flex flex-col gap-3"
        onClick={() => handlecategory('Football')}
      >
        <div className="w-24  rounded-full shadow-lg overflow-hidden">
          <img
            src="/images/football.png"
            alt="Football"
            className="object-cover"
          ></img>
        </div>
        <h3 className="text-center ">FOOTBALL</h3>
      </div>
      <div className="cursor-pointer  flex flex-col gap-4">
        <div
          className="w-24  rounded-full shadow-lg "
          onClick={() => handlecategory('Socks')}
        >
          <img
            src="/images/socks.png"
            alt="Socks"
            className="object-cover"
          ></img>
        </div>
        <h3 className="text-center">SOCKS</h3>
      </div>
      <div
        className="cursor-pointer  flex flex-col gap-4"
        onClick={() => handlecategory('Assecceires')}
      >
        <div className="w-24  rounded-full shadow-lg ">
          <img
            src="/images/gloves.png"
            alt="Gloves"
            className="object-cover"
          ></img>
        </div>
        <h3 className="text-center ">ASSECCEIRES</h3>
      </div>
    </div>
  );
};

export default Category;
