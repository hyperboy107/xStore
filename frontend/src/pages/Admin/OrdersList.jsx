import React from 'react'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice'
import AdminMenu from '../Admin/AdminMenu.jsx'

const OrdersList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();
    return (
        <>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>
                {error?.data?.messasge || error.error}
            </Message>) : (
                <table className='container mx-auto'>
                    <AdminMenu />
                    <thead className='w-full'>
                        <tr className='mb-[5rem]'>
                            <th className="py-2 px-[6rem]">ITEMS</th>
                            <th className="text-left px-[5rem]">ID</th>
                            <th className=" px-[4./9rem] ">USER</th>
                            <th className="text-left px-[9rem] pl-[4rem]">DATE</th>
                            <th className="text-left px-[9rem] pl-[2.5rem]">TOTAL</th>
                            <th className="text-left px-[9rem] pl-[2.5rem]">PAID</th>
                            <th className="text-left px-[9rem] pl-0">DELIVERED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className='py-2 px-[6rem]'><img src={order.orderItems[0].image} alt={order._id} className='w-[6rem] mb-2' /></td>
                                <td className="py-2 pl-[0rem] px-[3rem]">{order._id}</td>
                                <td className="py-2 text-left px-[1rem]">{order.user ? order.user.username : "N/A"}</td>
                                <td className="py-2 px-[4rem]">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                                <td className="py-2 px-[2.1rem]">₹{order.totalPrice}</td>
                                <td className="py-2 px-[1.1rem]">{order.isPaid ? (
                                    <p className="p-1 text-center bg-green-500 w-[6rem] rounded-full">Paid</p>
                                ) : <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full">Pending</p>}</td>
                                <td className="py-2 px-[0rem]">{order.isDelivered ? (
                                    <p className="p-1 text-center bg-green-500 w-[6rem] rounded-full">Completed</p>
                                ) : <button className="p-1 text-center bg-red-600 w-[6rem] rounded-full">
                                    <Link to={`/order/${order._id}`}>Pending</Link>
                                </button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </>
    )
}

export default OrdersList