import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItems from './ProductItems';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setTotalPage } from '../utils/productSlice';
import ShimmerUI from './ShimmerUI';
import Pagination from './Pagination';

const Product = () => {
  //const [productData, setProductData] = useState([]);
  const productData = useSelector((store) => store.product.items);
  const isSearching = useSelector((store) => store.product.isSearching);
  //const totalPage = useSelector((store) => store.product.totalPage);
  const currentPage = useSelector((store) => store.product.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSearching) fetchData();
  }, [currentPage, isSearching]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://goalgear.onrender.com/allProducts?page=${currentPage}`
      );
      console.log(response.data);
      dispatch(setData(response.data.product));
      dispatch(setTotalPage(response.data.totalPages));
    } catch (err) {
      console.log('Error : ', err.message);
    }
  };

  if (!productData || !productData.length) {
    return <ShimmerUI />;
  }

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="my-10 flex gap-[18px] flex-wrap justify-center max-w-[1200px]">
          {productData.map((data) => (
            <Link key={data._id} to={`/product/${data._id}`}>
              <ProductItems productData={data} />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default Product;
