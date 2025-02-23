const ProductItems = (props) => {
  const { productData } = props;

  const mainImage = productData?.color?.[0]?.mainImageUrl;
  const hoverImage = productData?.color?.[0]?.hoverImageUrl;
  const productName = productData.productName;
  const price = productData.price;

  return (
    <div className="w-[250px] h-[400px]  mb-4 relative shadow-md">
      <div className="relative  cursor-pointer rounded-xl">
        <img
          className="rounded-xl w-full h-[250px] object-cover transition-opacity duration-500 ease-in-out "
          alt="Product"
          src={mainImage}
        ></img>

        <img
          className="rounded-xl w-full h-[250px] object-cover transition-opacity duration-500 ease-in-out absolute inset-0 opacity-0 hover:opacity-100"
          alt="Hover Image"
          src={hoverImage}
        />
      </div>

      <h2 className="mt-2 px-2 cursor-pointer py-2 font-bold text-gray-800 ">
        {productName}
      </h2>

      <div className="absolute  mb-2 px-2  bottom-2 ">
        <div className="flex gap-[85px] items-center">
          <p className="font-semibold text-lg  right-2">₹ {price}.00</p>
          <button className="py-2 px-5 rounded-xl bg-black text-white">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
