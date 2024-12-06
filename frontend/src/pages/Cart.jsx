import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {FaTrash} from 'react-icons/fa'
import { addToCart,removeFromCart } from '../redux/features/cart/cartSlice.js'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    const removeFromCarthandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

  return (
    <>
        <div className="container flex justify-around items-start wrap mx-auto mt-8">
            {cartItems.length === 0 ? (<div className='text-indigo-600 font-semibold'><Link to='/shop'>Empty Cart Go To Shop</Link></div>) : (
                <>
                <div className="flex flex-col w-[80%]">
                    <h1 className="text-2xl font-semibold mb-4 text-indigo-600">Shopping Cart</h1>

                    {cartItems.map((item) => (
                        <div className='flex items-center pb-2 mb-[1rem]' key={item._id}>
                            <div className='w-[5rem] h-[5rem]'>
                                <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded' />
                            </div>

                            <div className="flex-1 mb4">
                                <Link to={`/product/${item._id}`} className='text-pink-500 ml-1'>
                                    {item.name}
                                </Link>

                                <div className="mt-2 text-white ml-1">{item.brand}</div>
                                <div className="mt-2 text-white ml-1">₹{item.price}</div> 
                            </div>
                            <div className="w-24">
                                <select className="w-full p-1 border rounded text-white bg-black" value={item.qty} onChange={e => addToCartHandler(item, Number(e.target.value))}>
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option value={x + 1} key={x + 1}>
                                            {x + 1}
                                        </option>
                    ))}
                                </select>
                            </div>
                            <div>
                                <button className='text-red-500 mr-[5rem]' onClick={() => removeFromCarthandler(item._id)}>
                                    <FaTrash className='ml-[1rem]'/>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-8 w-[40rem]">
                        <div className="p4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">
                                Total Items ({cartItems.reduce((acc, item) => acc+item.qty, 0)}){" "}
                            </h2>
                            <div className="text-2xl font-semibold">
                                ₹ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} {" "}
                            </div>

                            <button disabled={cartItems.length === 0} onClick={checkOutHandler}
                            className="bg-pink-600 mt-4 py-2 px-4 rounded-full text-lg w-full">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    </>
  )
}

export default Cart