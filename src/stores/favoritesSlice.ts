import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipeSlice, recipesSliceType } from "./recipeSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: ( recipe: Recipe ) => void
    favoritesExists: ( id: Recipe['idDrink'] ) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & recipesSliceType, [], [], FavoritesSliceType> = ( set, get, api ) => ({
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
    createRecipeSlice( set, get, api ).closeModal()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
   },
   favoritesExists: ( id ) => {
    return get().favorites.some( favorite => favorite.idDrink === id)
   },
    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem('favorites')
        if( storeFavorites ) {
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    } 
}) 