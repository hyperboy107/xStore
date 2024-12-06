import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from '../../redux/features/cart/cartSlice.js'
import {toast} from 'react-toastify'
import HeartIcon from "./HeartIcon"
import {AiOutlineShoppingCart} from 'react-icons/ai'

const ProductCard = ({p}) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}))
        toast.success("Item Added Succesfully")
    }
  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <section className="relative">
        <Link to={`/product/${p._id}`}>
            <span className="absolute bottom-3 right-3 bg-[#4338ca] text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                {p.brand}
            </span>
            <img src={p.image} alt={p.name} style={{height: '170px', objectFit: 'cover'}} className="cursor-pointer w-full"/>
        </Link>
            <HeartIcon product={p}/>
    </section>
    <div className="p-5">
        <div className="flex justify-between">
            <h5 className="mb-2 text-[1rem] text-white dark:text-white">
                {p.name}
            </h5>
            <p className="font-semibold text-[#bfbbee]">
                {p?.price?.toLocaleString("en-US", {
                    style : "currency",
                    currency : 'INR'
                })}
            </p>
        </div>
        <section className="flex justify-between items-center">
            <button className="p-2 rounded-full" onClick={() => addToCartHandler(p, 1)}>
                <AiOutlineShoppingCart size={25} />
            </button>
        </section>
    </div>
    </div>
  )
}

export default ProductCard