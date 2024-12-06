
//Add product to localstorage
export const addFavToLocalStorage = (product) => {
    const favorites = getFavouritesFromLocalStorage();
    if(!favorites.some((p) => p._id == product._id)){
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

//Remove  product from localstorage
export const remocveFavToLocalStorage = (productId) => {
    const favorites = getFavouritesFromLocalStorage();
    const updateFav = favorites.filter((product) => product._id !== productId)
    localStorage.setItem('favorites', JSON.stringify(updateFav))
}

//Retrieve fav from localstorage
export const getFavouritesFromLocalStorage = () => {
    const favoritesJson = localStorage.getItem('favorites')
    return favoritesJson ? JSON.parse(favoritesJson) : [];
}