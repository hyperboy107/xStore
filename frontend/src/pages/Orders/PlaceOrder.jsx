import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProgressSteps from '../../components/ProgressSteps'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice.js'
import { clearCartItems } from '../../redux/features/cart/cartSlice.js'


const PlaceOrder = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart)

    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    // console.log(cart.shippingAddress.address);
    useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error)
        }
    }
  return (
    <>
        <ProgressSteps step1 step2 step3/>
        <div className="container mx-auto mt-8">
            {cart.cartItems.length === 0 ? (
                <Message>Empty Cart</Message>
            ) : (
                <div className="overflow-x-auto">
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr>
                                <td className='px-[6.5rem] py-2 text-left align-top'>Image</td>
                                <td className='px-1 py-2 text-left'>Product</td>
                                <td className='px-1 py-2 text-left'>Quantity</td>
                                <td className='px-1 py-2 text-left'>Price</td>
                                <td className='px-1 py-2 text-left'>Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td className='p-2 px-[6rem]'>
                                        <img src={item.image} alt={item.name}  className='w-16 h-16 object-cover'/>
                                    </td>
                                    <td className="p-2">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </td>
                                    <td className="p-2 ">{item.qty}</td>
                                    <td className="p-2">₹ {item.price.toFixed(2)}</td>
                                    <td className="p-2 ">₹ {(item.qty * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-8 px-[6.6rem]">
                                <h2 className="text-2xl font-semibold mb-6 text-pink-500">Order Summary</h2>
                                <div className="flex justify-between text-[#ffffff] flex-wrap p-7 bg-[#1f2937]">
                                    <ul className="text-lg">
                                        <li>
                                            <span className="font-semibold mb-4 ">Items: </span>
                                            ₹{cart.itemsPrice}
                                        </li>
                                        <li>
                                            <span className="font-semibold mb-4 ">Shipping: </span>
                                            ₹{cart.shippingPrice}
                                        </li>
                                        <li>
                                            <span className="font-semibold mb-4 ">Tax: </span>
                                            ₹{cart.taxPrice}
                                        </li>
                                        <li>
                                            <span className="font-semibold mb-4 ">Total: </span>
                                            ₹{cart.totalPrice}
                                        </li>
                                    </ul>
                                    {error && <Message variant='danger'>{error.data.message}</Message>}
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                                        <p>
                                            {cart.shippingAddress.address},<br/> {cart.shippingAddress.city} {" "}
                                            {cart.shippingAddress.postalCode}
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                                        <strong>Method: </strong>
                                        {cart.paymentMethod}
                                    </div>
                                </div>
                                <button className="text-white px-4 py-2 hover:bg-[#4f46e5] hover:font-semibold bg-blue-600 rounded-full w-full mt-4 text-lg"
                                disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</button>
                                {isLoading && <Loader />}
                            </div>
        </div>
    </>
  )
}

export default PlaceOrder