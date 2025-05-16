import './index.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';

import Header from './components/Header';
import Category from './components/Category';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import ProductDetails from './components/ProductDetails';
import { Provider, useDispatch } from 'react-redux';
import appStore from './utils/appStore';
import axios from 'axios';
import { addUser } from './utils/userSlice';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Refund from './components/Refund';
import Cancellation from './components/Cancellation';
import Address from './components/Address';
import Order from './components/Order';

const Applayout = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const token = localStorage.getItem('token'); // Retrieve token

    if (!token) {
      console.error('No token found, user not logged in');
      return;
    }
    try {
      console.log('🔹 Sending request with token:', token);

      const res = await axios.get(
        'https://goalgear.onrender.com/profile/view',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the request
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-0 m-0">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <Category />
            <Product />
          </>
        ),
      },
      {
        path: 'product/:productId',
        element: <ProductDetails />,
      },
      {
        path: '/address',
        element: <Address />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/Contact',
    element: <Contact />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/refund',
    element: <Refund />,
  },
  {
    path: '/cancel',
    element: <Cancellation />,
  },
  {
    path: '/order',
    element: <Order />,
  },
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
