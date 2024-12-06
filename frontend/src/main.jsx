import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css";
import { Route, RouterProvider, Routes, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/features/store';

//Private route
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/User/Profile';

import AdminRoutes from './pages/Admin/AdminRoutes';
import UserList from './pages/Admin/UserList';
import Category from './pages/Admin/Category';
import ProductList from './pages/Admin/ProductList';
import ProductUpdate from './pages/Admin/ProductUpdate';
import AllProducts from './pages/Admin/AllProducts';
import Home from './pages/Home.jsx';
import Favorites from './pages/Products/Favorites.jsx';
import ProductsDetails from './pages/Products/ProductsDetails.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';

import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import Order from './pages/Orders/Order.jsx';
import UserOrder from './pages/User/OrderUser.jsx'
import OrdersList from './pages/Admin/OrdersList.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' index={true} element={<Home />} />
      <Route path='/favorite' element={<Favorites />} />
      <Route path='/product/:id' element={<ProductsDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/users-orders' element={<UserOrder />} />

{/* Orders */}
    <Route path="" element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/placeorder' element={<PlaceOrder />} />
      <Route path='/order/:id' element={<Order />} />

    </Route>
    {/* Admin */}
    <Route path='/admin' element={<AdminRoutes />}>
      <Route path='userlist' element={<UserList />} />
      <Route path='categorylist' element={<Category />} />
      <Route path='productlist' element={<ProductList />} />
      <Route path='allproduct' element={<AllProducts />} />
      <Route path='product/update/:_id' element={<ProductUpdate />} />
      <Route path='orderlist' element={<OrdersList />} />
      <Route path='dashboard' element={<AdminDashboard />} />
    </Route>
  
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PayPalScriptProvider>
     <RouterProvider router={router} />
  </PayPalScriptProvider>
  </Provider>
)
