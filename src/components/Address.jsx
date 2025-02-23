import { useState } from 'react';

const Address = () => {
  const [formData, setFormData] = useState({
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {

    if (name === 'pincode') {
      // Allow only numbers and limit to 6 digits
      if (!/^\d{0,6}$/.test(e.target.value )) return;
    }
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
