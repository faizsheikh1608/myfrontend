import { useNavigate } from "react-router-dom";

const Cancellation = () => {

  const navigate = useNavigate()

  return (
    <div className="w-[100vp] mt-5 mx-5">
      <h1 className="text-2xl font-bold">Cancellation Policy</h1>
      <p className="mt-4 text-lg">Last updated on 23-02-2025 15:57:53</p>
      <p className="mt-5">
        FAIZ M YAQUB SHEIKH believes in helping its customers as far as
        possible, and has therefore a liberal cancellation policy. Under this
        policy:
      </p>
      <ul className="mt-4 list-disc ml-6 text-gray-900">
        <li >
          Cancellations will be considered only if the request is made
          immediately after placing the order. However, the cancellation request
          may not be entertained if the orders have been communicated to the
          vendors/merchants and they have initiated the process of shipping
          them.
        </li>
        <li className="mt-2">
          {' '}
          FAIZ M YAQUB SHEIKH does not accept cancellation requests for
          perishable items like flowers, eatables etc. However,
          refund/replacement can be made if the customer establishes that the
          quality of product delivered is not good.
        </li>
        <li className="mt-2">
          {' '}
          In case of receipt of damaged or defective items please report the
          same to our Customer Service team. The request will, however, be
          entertained once the merchant has checked and determined the same at
          his own end. This should be reported within 7 Days days of receipt of
          the products. In case you feel that the product received is not as
          shown on the site or as per your expectations, you must bring it to
          the notice of our customer service within 7 Days days of receiving the
          product. The Customer Service Team after looking into your complaint
          will take an appropriate decision.
        </li>
        <li className="mt-2">
          In case of complaints regarding products that come with a warranty
          from manufacturers, please refer the issue to them. In case of any
          Refunds approved by the FAIZ M YAQUB SHEIKH, it’ll take 6-8 Days days
          for the refund to be processed to the end customer.
        </li>
      </ul>
      <button onClick={() => navigate('/')} className="bg-green-500 text-white py-2 cursor-pointer px-3 my-2 rounded-xl">Back To Home</button>
    </div>
  );
}


export default Cancellation;