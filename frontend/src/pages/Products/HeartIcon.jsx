
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {useSelector, useDispatch} from "react-redux"
import {addToFavourites, removeFromfav, setFavorites} from '../../redux/features/favourite/favSlice'
import {addFavToLocalStorage, remocveFavToLocalStorage, getFavouritesFromLocalStorage} from '../../Utils/localStorage.js'
import {useEffect} from 'react'

const HeartIcon = ({product}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id == product._id);

  useEffect(() => {
    const favFromLocalStorage = getFavouritesFromLocalStorage();
    dispatch(setFavorites(favFromLocalStorage));
  }, [])

  const toggleFav = ()  => {
    if(isFavorite){
      dispatch(removeFromfav(product));
      //Remove the product from the local storage
      remocveFavToLocalStorage(product._id);
    }
    else{
      dispatch(addToFavourites(product))
      //add the product to local storage as well
      addFavToLocalStorage(product)
    }
  }
  return (
    <div onClick={toggleFav} className='absolute top-2 right-5 cursor-pointer'>
      {isFavorite ? (<FaHeart className='text-pink-500' />) : (
        <FaRegHeart className='text-indigo-600' />
      )}
    </div>
  )
}

export default HeartIcon;