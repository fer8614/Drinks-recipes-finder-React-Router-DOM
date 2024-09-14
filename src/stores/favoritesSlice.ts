import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipeSlice, recipesSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoritesExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & recipesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoritesExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }))
      createNotificationSlice( set, get, api ).showNotification({ 
        text: "Removed from favorites", 
        error: true 
        })
    } else {
      console.log("object not in favorites");
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }))
      createNotificationSlice( set , get, api ).showNotification({ 
        text: "Added to favorites", 
        error: false 
        })
    }
    createRecipeSlice(set, get, api).closeModal();
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoritesExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storeFavorites = localStorage.getItem("favorites");
    if (storeFavorites) {
      set({
        favorites: JSON.parse(storeFavorites),
      });
    }
  },
});
