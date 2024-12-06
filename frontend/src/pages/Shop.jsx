import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice.js'
import { useFetchCategoriesQuery } from '../redux/api/categorySliceApi.js'
import { setCategories, setChecked, setProducts } from '../redux/features/shop/shopSlice.js'
import Loader from '../components/Loader.jsx'
import ProductCard from './Products/ProductCard.jsx'

const Shop = () => {
    const dispatch = useDispatch();
    const { categories, radio, checked, products } = useSelector((state) => state.shop)
    const categoriesQuery = useFetchCategoriesQuery()
    const [priceFilter, setPriceFilter] = useState("")
    const filtredProductsQuery = useGetFilteredProductsQuery({
        checked, radio
    })
    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch])

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filtredProductsQuery.isLoading) {
                //Filter products based on both chekced categories and price filter
                const filteredProducts = filtredProductsQuery.data.filter(
                    (product) => {
                        // Check if the product price includes the entered price filter value
                        return (
                            product.price.toString().includes(priceFilter) ||
                            product.price === parseInt(priceFilter, 10)
                        );
                    })
                dispatch(setProducts(filteredProducts));
            }
        }
    }, [checked, radio, filtredProductsQuery.data, dispatch, priceFilter])

    const handleBrandClick = (brand) => {
        const productsByBrand = filtredProductsQuery.data?.filter((p) => p.brand === brand)
        dispatch(setProducts(productsByBrand))
    }

    const handleCheck = (value, id) => {
        const updateChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
        dispatch(setChecked(updateChecked))
    }

    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value)
    }

    // Add "All Brands" option to uniqueBrands
    const uniqueBrands = [
        ...Array.from(new Set(filtredProductsQuery.data?.map((p) => p.brand).filter((b) => b !== undefined)))
    ]
    return (
        <>
            <div className='mx-auto container'>
                <div className='flex md:flex-row'>
                    <div className='p-3 mt-2 mb-2 bg-[#151515] ml-[6rem]'>
                        <h2 className='h4 text-center py-2 bg-black rounded-full mb-2'>
                            Filter By Categories
                        </h2>
                        <div className='p-5 w-[15rem]'>
                            {categories?.map((c) => (
                                <div className='mb-2'>
                                    <div className="flex items-center mr-6">
                                        <input type='checkbox' id='red-checkbox' onChange={(e => handleCheck(e.target.checked, c._id))}
                                            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"

                                        />
                                        <label htmlFor='pink-checkbox' className='ml-2 text-sm font-medium text-white dark:text-gray-300'>
                                            {c.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2 className="h4 text-center py-2 bg-black rounded-lg mb-2">Filter By Brands</h2>
                        <div className="p4">
                            {uniqueBrands?.map((brand) => (
                                <>
                                    <div className='flex items-center mr-4 mb-5'>
                                        <input type='radio' id={brand} name='brand' onChange={() => handleBrandClick(brand)}
                                            className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label
                                            htmlFor="pink-radio"
                                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                        >
                                            {brand}
                                        </label>
                                    </div>
                                </>
                            ))}
                        </div>
                        <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                            Filter By Price
                        </h2>
                        <div className="p-5 w-[15rem]">
                            <input type='text' placeholder='Enter Price' value={priceFilter} onChange={handlePriceChange} 
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300" />
                        </div>
                        <div className="p-5 pt-0">
                            <button className='w-full border my-4' onClick={() => window.location.reload()}>Reset</button>
                        </div>
                    </div>
                    <div className="p-3">
                        <h2 className="h4 text-center mb-2">
                            {products?.length} Products
                        </h2>
                        <div className="flex flex-wrap">
                            {products.length === 0 ? (
                                <Loader />
                            ) : (
                                products?.map((p) => (
                                    <div className='p-3' key={p._id}>
                                        <ProductCard p={p} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop