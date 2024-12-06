import {useState, useEffect, Fragment} from 'react'
import { NavLink } from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'


const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <>
        <button className={`${isMenuOpen ? "top-2 right-2 " : "top-5 right-7"} bg-[#151515] p-2 fixed rounded-lg`} onClick={toggleMenu}>
            {isMenuOpen ? (
                <FaTimes color="white" />
            ): (
                <>
                    <div className="w-6 h-0.5 bg-white my-1"></div>
                    <div className="w-6 h-0.5 bg-white my-1"></div>
                    <div className="w-6 h-0.5 bg-white my-1"></div>
                </>
            )}
        </button>

        {isMenuOpen && (
            <section className="bg-[#151515] p-4 fixed right-7 top-5">
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-purple-600 rounded-sm" to='/admin/dashboard'
                        style={({isActive}) => ({
                            color: isActive ? 'greenyellow' : 'white',
                        })}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-purple-600 rounded-sm" to='/admin/categorylist'
                        style={({isActive}) => ({
                            color: isActive ? 'greenyellow' : 'white',
                        })}>Add Category</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-purple-600 rounded-sm" to='/admin/productlist'
                        style={({isActive}) => ({
                            color: isActive ? 'greenyellow' : 'white',
                        })}>Add Product</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-purple-600 rounded-sm" to='/admin/allproduct'                        
                        style={({isActive}) => ({
                            color: isActive ? 'greenyellow' : 'white',
                        })}>All Products</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-purple-600 rounded-sm" to='/admin/userlist'
                        style={({isActive}) => ({
                            color: isActive ? 'greenyellow' : 'white',
                        })}>Users</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-purple-600 rounded-sm" to='/admin/orderlist'
                        style={({isActive}) => ({
                            color: isActive ? 'greenyellow' : 'white',
                        })}>Orders</NavLink>
                    </li>
                </ul>
            </section>
        )}
    </>
  )
}

export default AdminMenu