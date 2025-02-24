import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Address = () => {
  const navigate = useNavigate();
  const total = useSelector((store) => store.total)

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

  const loadRazorpay = async () => {
    const scriptLoaded = await loadRazorpayScript(); // ✅ Ensure script loads before calling Razorpay

    if (!scriptLoaded) {
      console.log(
        'Razorpay SDK failed to load. Check your internet connection.'
      );
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3000/create-order', {
        amount: `${total}`, // Set the amount dynamically as needed
        currency: 'INR',
      });

      const options = {
        key: 'rzp_test_lpRLO1HXfCrVeN', // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'GoalGear',
        description: 'Purchase of Football Accessories',
        order_id: data.id,
        handler: async function (response) {
          const verifyResponse = await axios.post(
            'http://localhost:3000/verify-payment',
            response
          );
          if (verifyResponse.data.success) {
            alert('Payment successful!');
            await axios.delete('http://localhost:3000/cart/clear', {
              withCredentials: true,
            });
            navigate('/');
          } else {
            alert('Payment failed!');
          }
        },
        prefill: {
          name: 'Faiz Sheikh',
          email: 'sheikhfaiz7861@gmail.com',
          contact: '8390438280',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log('Payment Error:', error);
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
