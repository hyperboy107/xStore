import React from 'react'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { useGetMyOrdersQuery } from '../../redux/api/orderApiSlice'


const Order = () => {
  const {data: orders, isLoading, error} = useGetMyOrdersQuery();
  return (
    <div className='container mx-auto'>
      <h2 className="text-2xl font-semibold mb-4 mt-4 px-[6rem]">My Orders</h2>
      {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.error || error.error}</Message>)
      : (
        <table>
          <thead>
            <tr>
              <td className="py-2 px-[6rem]">PRODUCT</td>
              <td className="py-2 px-[4rem]">ID</td>
              <td className="py-2 px-[4rem]">DATE</td>
              <td className="py-2 px-[4rem]">TOTAL</td>
              <td className="py-2 px-[4.2rem]">PAID</td>
              <td className="py-2 px-[4rem]">DELIVERED</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className='px-[8rem]'>
              <td className="py-2 px-[6rem]"><img src={order.orderItems[0].image} alt={order.user}  className='w-[6rem] mb-2'/></td>
              <td className="py-2 px-[4rem]">{order._id}</td>
              <td className="py-2 px-[4rem]">{order.createdAt.substring(0, 10)}</td>
              <td className="py-2 px-[4rem]">₹{order.totalPrice}</td>
              <td className="py-2 px-[2.5rem]">{order.isPaid ? (
                <p className="p-1 text-center bg-green-500 w-[6rem] rounded-full">Paid</p>
              ) : <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full">Pending</p>}</td>
              <td className="py-2 px-[4rem]">{order.isDelivered ? (
                <p className="p-1 text-center bg-green-500 w-[6rem] rounded-full">Completed</p>
              ) : <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full">Pending</p>}</td>
                <td className="py-2 px-[4rem]">
                  <Link to={`/order/${order._id}`}>
                    <button className='bg-indigo-500 hover:bg-pink-500 text-white py-2 px-3 rounded-md'>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Order