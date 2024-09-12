import { StateCreator } from "zustand";
import { Recipe } from "../types";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: ( recipe: Recipe ) => void
    favoritesExists: ( id: Recipe['idDrink'] ) => boolean
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType> = ( set, get ) => ({
   favorites: [], 
   handleClickFavorite: ( recipe ) => {
    if( get().favoritesExists( recipe.idDrink ) ) {
        set(( state ) => ({
            favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink )
    }))
    } else {
        console.log('object not in favorites')
        set(( state ) => ({
            favorites: [ ...state.favorites, recipe ]
        }))
    }
   },
   favoritesExists: ( id ) => {
    return get().favorites.some( favorite => favorite.idDrink === id)
   }
}) 