import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { saveShippingAddress, savePaymentMethod } from '../../redux/features/cart/cartSlice'
import {FaShippingFast} from 'react-icons/fa'
import ProgressSteps from '../../components/ProgressSteps'

const Shipping = () => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode}))
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    //Payment
    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    }, [navigate, shippingAddress])

  return (
    <div className='container mx-auto mt-10'>
    <ProgressSteps step1 step2 />

    <div className='flex justify-around items-center flex-wrap mt-[6rem]'>
        <form onSubmit={submitHandler} className='w-[40rem]'>
            <h1 className='mb-4 font-semibold text-2xl'>Shipping</h1>
            <div className="mb-4">
                <label className="block text-white mb-2">Address</label>
                <input type='text' className='w-full p-2 border-indigo-600 rounded bg-black text-white' placeholder='Enter Your Address' value={address} required onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">City</label>
                <input type='text' className='w-full p-2 border-indigo-600 rounded bg-black text-white' placeholder='Enter Your City' value={city} required onChange={e => setCity(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">PIN Code</label>
                <input type='text' className='w-full p-2 border-indigo-600 rounded bg-black text-white' placeholder='Enter Your Pin' value={postalCode} required onChange={e => setPostalCode(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 mb-2">Select Method</label>
                <div className="mt-2">
                    <label className="inline-flex items-center">
                        <input type='radio' className='form-radio text-white-500' name='paymentMethod' value='PayPal' checked={paymentMethod === 'PayPal'} onChange={e => setPaymentMethod(e.target.value)} />
                        <span className="ml-2">PayPal or Credit Card</span>
                    </label>
                </div>
             </div>
             <button className="bg-blue-600 hover:bg-[#4f46e5] hover:font-semibold text-white py-2 rounded-full text-lg w-full px-4" type='submit'>
                Proceed To Payment
             </button>
        </form>
    </div>
    </div>
  )
}

export default Shipping