import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productSize, setProductSize] = useState('');
  const [showImage, setShowImage] = useState('');
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const { productId } = useParams();

  //fetching product Details
  useEffect(() => {
    fetchData();
  }, [productId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://goalgear.onrender.com/product/${productId}`
      );
      console.log(response.data.product);
      setProduct(response.data.product);
      setShowImage(response.data.product?.color?.[0]?.mainImageUrl);
    } catch (err) {
      console.log('Error ', err.message);
    }
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const mainImage = product?.color?.[0]?.mainImageUrl;
  const hoverImage = product?.color?.[0]?.hoverImageUrl;
  const productName = product?.productName;
  const price = product?.price;
  const size = product?.size;
  const description = product?.description;
  const stock = product?.stock ?? 1;

  const increasedQuantity = () =>
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  const decreasedQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  //handle add to cart
  const handleAdd = async () => {
    try {
      if (productSize.length === 0) {
        alert('Please Select Size !');
        return;
      }

      const res = await axios.post(
        `https://goalgear.onrender.com/cart/addItem`,
        {
          productId: productId,
          status: 'notPlaced',
          size: productSize,
          quantity: quantity,
        },
        { withCredentials: true }
      );

      if (res) {
        setAdded(true);
      }
      setProductSize('');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative flex gap-8 my-8 mx-28">
      <div className="w-6/12 h-svh object-cover rounded-3xl shadow-lg relative">
        <img
          alt="product"
          src={showImage}
          className="w-full h-full rounded-3xl"
        ></img>
        <div className="absolute flex justify-center gap-5  bottom-2 left-[175px]">
          <div
            onClick={() => setShowImage(mainImage)}
            className="w-[80px] h-[80px] border-2 border-black cursor-pointer rounded-2xl"
          >
            <img
              className="h-full w-full object-cover rounded-2xl"
              src={mainImage}
            ></img>
          </div>
          <div
            onClick={() => setShowImage(hoverImage)}
            className="w-[80px] h-[80px] border-2 border-black cursor-pointer rounded-2xl"
          >
            <img
              className="h-full w-full object-cover rounded-2xl hover:border-blue-600"
              src={hoverImage}
            ></img>
          </div>
        </div>
      </div>
      <div className="w-6/12 shadow-2xl rounded-3xl border-[1px] overflow-hidden">
        <p className="bg-black text-white text-center font-bold text-[20px] py-2">
          Great Choice
        </p>
        <h2 className="font-bold text-[24px] px-4 pt-2">{productName}</h2>
        <p className="px-4 py-2 text-[21px] mt-2">₹ {price}.00</p>
        <div className="px-4 flex gap-4 items-center mt-4">
          <p className="text-[20px]">Size : </p>
          <div id="sizeData" className="flex gap-5">
            {size.map((s) => (
              <div
                onClick={() => setProductSize(s)}
                key={s}
                className={`border-2 py-1 px-4 cursor-pointer text-black hover:border-black ${
                  productSize === s ? `bg-black text-white` : ``
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="flex justify-between items-center mx-4 px-2 border-2 mt-4">
            <div
              onClick={decreasedQuantity}
              className="text-[25px] cursor-pointer font-bold pb-1"
            >
              -
            </div>
            <div className="w-6/12 text-center ">{quantity}</div>
            <div
              onClick={increasedQuantity}
              className="text-[25px] cursor-pointer font-bold pb-1"
            >
              +
            </div>
          </div>
          <div
            onClick={handleAdd}
            className="text-center bg-black text-white py-3 mx-4 cursor-pointer"
          >
            ADD TO CART
          </div>
        </div>
        <div
          id="return-policy"
          className="px-4 mt-6 flex items-center justify-center gap-14 text-center"
        >
          <div>
            <p>
              <i className="bi bi-truck text-[25px] font-bold"></i>
            </p>
            <p className="font-semibold">Easy Return</p>
          </div>
          <div>
            <p>
              <i className="bi bi-arrow-clockwise text-[25px] font-bold"></i>
            </p>
            <p className="font-semibold">Reliable Customer Help</p>
          </div>
          <div>
            <p>
              <i className="bi bi-credit-card text-[25px] font-bold"></i>
            </p>
            <p className="font-semibold">Secure Checkout</p>
          </div>
        </div>
        <div id="description " className="mx-4 mt-4 mb-3">
          <h2 className="text-gray-500 font-bold text-[20px]">Description</h2>
          <h4 className="py-2 text-[18px] font-semibold">
            {description.descriptionHeading}
          </h4>
          <ul className="list-disc pl-8">
            {description.descriptionData.map((des) => (
              <li key={des} className="py-1">
                {des}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {added && (
        <div className="absolute inset-0 fixed   flex justify-center items-center bg-black/20">
          <div className="bg-white text-center w-[28%] h-4/12 rounded-xl">
            <p className="text-xl  mt-12 font-bold">
              Successfully added to the cart.
            </p>
            <button
              className="mt-4 py-2 px-2 bg-green-800 text-lg text-white rounded-lg cursor-pointer"
              onClick={() => {
                navigate('/');
                setAdded(false);
              }}
            >
              Continue Shoping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
