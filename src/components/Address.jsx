import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const total = useSelector((store) => store.total);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers and limit to 6 digits for pincode
    if (name === 'pincode' && !/^\d{0,6}$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  //Payment
  const loadRazorpay = async () => {
    try {
      const order = await axios.post(
        'https://goalgear.onrender.com/create-order',
        {
          amount: total, // Set the amount dynamically as needed
          currency: 'INR',
        },
        {
          withCredentials: true,
        }
      );

      const { amount, currency, orderId, notes } = order.data.data;

      const options = {
        key: 'rzp_test_lpRLO1HXfCrVeN',
        amount: amount,
        currency: currency,
        name: 'GoalGear',
        description: 'Purchase of Football Accessories',
        order_id: orderId,
        prefill: {
          name: notes.name,
          email: notes.emailId,
          contact: '8390438280',
        },
        theme: {
          color: '#3399cc',
        },
        handler: async function () {
          const data = await axios.post(
            'https://goalgear.onrender.com/payment/status',
            {},
            {
              params: {
                orderId,
              },
              withCredentials: true,
            }
          );

          console.log(data.data.payment);

          if (data.data.payment) {
            alert('Payment Successful!');
            navigate('/');
          } else {
            alert('Payment Failed. Please try again.');
            navigate('/cart');
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open(); // This will open Razorpay Dioluge box
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError('All required fields must be filled.');
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError('Pincode must be exactly 6 digits.');
      return;
    }

    setError('');
    console.log('Form submitted:', formData);

    // Call Razorpay directly after successful form submission
    loadRazorpay();
  };

  return (
    <div className="max-w-md my-8 mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Shipping Address</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Street</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            required
            className="p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Landmark</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Landmark"
            className="p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className="p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-lg cursor-pointer text-white p-2 rounded-md w-full "
        >
          Proceed To Pay
        </button>
      </form>
    </div>
  );
};

export default Address;
