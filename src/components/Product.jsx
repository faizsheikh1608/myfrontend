import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItems from './ProductItems';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../utils/productSlice';
import ShimmerUI from './ShimmerUI';

const Product = () => {
  //const [productData, setProductData] = useState([]);
  const productData = useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://goalgear.onrender.com/allProducts');

      dispatch(setData(response.data.product));
    } catch (err) {
      console.log('Error : ', err.message);
    }
  };

  if (!productData.length) {
    return <ShimmerUI />;
  }

  return (
    <div className="my-10 mx-[80px] flex gap-[18px] flex-wrap">
      {productData.map((data) => (
        <Link key={data._id} to={`/product/${data._id}`}>
          <ProductItems productData={data} />
        </Link>
      ))}
    </div>
  );
};

export default Product;
