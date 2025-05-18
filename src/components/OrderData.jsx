const OrderData = ({ date, data }) => {
  const dates = new Date(date);
  const dateStr = `${dates.getDate()}-${
    dates.getMonth() + 1
  }-${dates.getFullYear()}`;

  const getStatuscolor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-red-800';
      case 'confirmed':
        return 'bg-amber-800';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <div className="flex relative gap-7  my-[40px] border w-full  h-[250px] rounded-xl overflow-hidden object-cover shadow-lg">
      <div className="h-full w-[30%]">
        <img
          src={data?.mainImageUrl}
          alt="Product"
          className="w-full h-full object-cover object-fill"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{data?.productName}</h2>

        <p className="text-lg my-1 font-semibold mt-2">Size: {data?.size}</p>
        <p className="text-lg my-1 font-semibold">Quantity: {data?.quantity}</p>
        <p className="text-lg my-1  font-semibold">Price: ₹ {data?.price}</p>
        <p className="text-lg my-1  font-semibold">
          Total Amount : ₹ {data?.price * data?.quantity}
        </p>
        <div className="absolute bottom-1 flex items-center gap-28">
          <div className="flex gap-2 items-center">
            <div
              className={`${getStatuscolor(
                data?.status
              )} min-w-2 max-w-2 min-h-2 rounded-full mt-1`}
            ></div>
            <p className="text-lg my-1  font-semibold">{data?.status}</p>
          </div>
          <p className="text-lg my-1  font-semibold">Order Date : {dateStr}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderData;
